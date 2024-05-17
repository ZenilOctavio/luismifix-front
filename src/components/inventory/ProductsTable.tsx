import useProducts from "@/hooks/useProducts"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronsUpDown, ChevronsRight, ChevronsLeft, ChevronRight, ChevronLeft, Ellipsis, Settings2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Product } from "@/types/products/Product"
import { Purchase } from "@/types/purchases/Purchase"
import { AddProductDialog } from "./AddProductDialog"
import { toast } from "../ui/use-toast"


const headersClassNames = "bg-background text-slate-500 hover:bg-background text-center flex gap-2"



export function ProductsTable({onEditProduct}: {onEditProduct?: Function | undefined}) {
    
    const { products, purchasesForProducts, enableProduct, disableProduct } = useProducts() 

    
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    
    const handleEditProduct = (product: Product) => {
        if (onEditProduct) onEditProduct(product)
    }

    const productsTableColumns = React.useMemo<ColumnDef<Product>[]>(() => {
        return ([
            {
                id: "select",
                header: ({ table }) => (
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    onChange={() => table.toggleAllPageRowsSelected()}
                    aria-label="Select all"
                  />
                ),
                cell: ({ row }) => (
                  <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={() => row.toggleSelected()}
                    aria-label="Select row"
                  />
                ),
                enableSorting: false,
                enableHiding: false,
              },
            {
                id: "Nombre",
                accessorKey: "nameProduct",
                header: ({column}) => {
                    return(
                        <Button
                            className={headersClassNames}
                            onClick={() => {column.toggleSorting(column.getIsSorted() == 'asc')}}
                        >
                            Nombre
                            <ChevronsUpDown className="w-4"/>
                        </Button>
                    )
                },
                cell: ({ row }) => <div>{row.getValue("Nombre")}</div>
            },
            {
                id: "Descripción",
                accessorKey: "descriptionProduct",
                header: ({column}) => {
                    return(
                        <Button
                            className={headersClassNames}
                            onClick={() => {column.toggleSorting(column.getIsSorted() == 'asc')}}
                        >
                            Descripción
                            <ChevronsUpDown className="w-4"/>
                        </Button>
                    )
                },
                cell: ({row}) => <div>{row.original.descriptionProduct}</div>
            },
            {
                id: "Link de compra",
                header: () => ( <div>Link de compra</div>),
                cell: ({row}) => {

                    const product = row.original

                    // console.log(purchasesForProducts)
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-slate-50 text-slate-600 flex gap-2 dark:bg-slate-800 dark:text-slate-400">
                                    Link(s)
                                    <ChevronsUpDown className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {purchasesForProducts[product._id] ? (
                                    purchasesForProducts[product._id].reduce(
                                        (prev: string[], curr: Purchase) => {
                                            return prev.concat(curr.linkProvider);
                                        },
                                        []
                                    ).map((link: string, index: number) => (
                                        <DropdownMenuItem 
                                            key={index}
                                            onClick={(event) => {
                                                event.preventDefault()
                                                navigator.clipboard.writeText(link)
                                                toast({
                                                    title: 'Link copiado',
                                                    description: link
                                                })
                                            }}
                                        >
                                            {link}
                                        </DropdownMenuItem>
                                    ))
                                ) : (
                                    <DropdownMenuItem>No Links to show</DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                }
            },
            {
                id: "Unidades disponibles",
                accessorKey: 'amountProduct',
                header: () => (<div className="text-center">Unidades disponibles</div>),
                cell: ({cell}) => {
    
                    return (<div className="text-center">{ cell.getValue() as number | string}</div>)
                }
            },
            {
                id: "Editar",
                header: () => {return ''},
                cell: ({row}) => {
                    // console.log(row.original)
                    return (
                                    <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="bg-white text-foreground p-0 w-12 rounded active:bg-white focus:bg-white hover:bg-white cursor-pointer dark:bg-slate-900 dark:text-primary">
                                            <Ellipsis className="h-5 text-foreground"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                      <DropdownMenuItem
                                        onClick={() => navigator.clipboard.writeText(row.original._id).then(() => {toast({title: 'ID copiado al portapapeles'})})}
                                      >
                                        Copiar ID
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem onClick={() => {handleEditProduct(row.original)}}>
                                          Editar producto
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                      onClick={() => {
                                          row.original.statusProduct? 
                                          disableProduct(row.original) : 
                                          enableProduct(row.original)
                                      }}
                                      >
                                          {row.original.statusProduct? 'Deshabilitar producto' : 'Habilitar producto'}
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                    )
                }
            }
        
        ])
    } , [products, purchasesForProducts])

    const table = useReactTable({
        data: products,
        columns: productsTableColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
          sorting,
          columnFilters,
          columnVisibility,
          rowSelection,
        },
      })
    
    return (
        <section className="p-12">
            <div className="pb-4 px-1 flex gap-3">
                <Input 
                    placeholder="Buscar Producto" 
                    value={(table.getColumn('Nombre')?.getFilterValue() as string ?? "")}
                    onChange={(e) => {
                        table.getColumn('Nombre')?.setFilterValue(e.target.value)
                    }}
                    className="max-w-80 rounded"
                />
                <AddProductDialog/>

                <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded shadow  flex gap-2 bg-background hover:bg-white  text-foreground ml-auto">
                    <Settings2/>
                    <span className="hidden md:inline">Vista</span>
                </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

            </div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            )
                            })}
                        </TableRow>
                        ))}
                    </TableHeader>
    
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}

                            >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell 
                                    key={cell.id}
                                    onClick={() => {
                                        console.log('cellId: ',cell.id)
                                        if (cell.id != '0_Editar') row.toggleSelected()
                                    }}
                                >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                                </TableCell>
                            ))}
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell
                            colSpan={productsTableColumns.length}
                            className="h-24 text-center"
                            >
                            No results.
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>

            </div>
        <div className= "flex justify-end p-2">
            <span className="mr-auto text-sm">{table.getSelectedRowModel().rows.length} of {table.getRowCount()} row(s) selected</span>
            <div className="flex items-center gap-4">
            <label className="text-sm font-semibold ">Rows per page</label>
                <Input type="number" className="w-20" value={table.getState().pagination.pageSize} onChange={(e) => {table.setPageSize(Number(e.target.value))}}/>
            </div>
            <span className="flex items-center text-sm font-semibold ml-3">Page {table.getState().pagination.pageIndex+1} of {table.getPageCount()}</span>
            <div className="flex gap-3 ml-6">
                <Button 
                    className="bg-background text-slate-500 rounded p-0 w-10 h-10 shadow hover:bg-background" 
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => {table.firstPage()}}
                >
                    <ChevronsLeft  className="w-6"/></Button>
                <Button 
                    className="bg-background text-slate-500 rounded p-0 w-10 h-10 shadow hover:bg-background" 
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => {table.previousPage()}}
                >
                    <ChevronLeft   className="w-6"/></Button>
                <Button 
                    className="bg-background text-slate-500 rounded p-0 w-10 h-10 shadow hover:bg-background" 
                    disabled={!table.getCanNextPage()}
                    onClick={() => {table.nextPage()}}

                >
                    <ChevronRight  className="w-6"/>

                </Button>
                <Button 
                    className="bg-background text-slate-500 rounded p-0 w-10 h-10 shadow hover:bg-background" 
                    disabled={!table.getCanNextPage()}
                    onClick={() => {table.lastPage()}}
                >
                    <ChevronsRight className="w-6"/>
                </Button>
            </div>
        </div>
        </section>
    )
}
