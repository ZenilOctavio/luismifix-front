import { Table, TableBody, TableHeader, TableRow, TableCell, TableHead } from "../ui/table"
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
    SortingFn
  } from "@tanstack/react-table"
import useProviders from "@/hooks/useProviders"
import { toast } from "../ui/use-toast"
import {  ChevronsUpDown, EllipsisVertical, Settings2 } from "lucide-react"
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuContent, DropdownMenuCheckboxItem } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { useState } from "react"
import { Provider } from "@/types/providers/Provider"


interface ProviderTableProps {
    onEditProvider: (provider: Provider) => void
    onProviderRowSelection: (provider: Provider) => void
}

function copyToClipboard(value: string, valueName: string){
    navigator.clipboard.writeText(value).then(() => {
        toast({
            title: `${valueName} copied to clipboard`,
        })
    })
    .catch((error) => {
        toast({
            title: `Error copying ${valueName}`,
            description: error.message
    })
    })
}

const headersClassNames = "bg-background text-slate-500 hover:bg-background text-center flex gap-2"


export default function ProvidersTable({onEditProvider, onProviderRowSelection}: ProviderTableProps){
    const { providers, enableProvider, disableProvider } = useProviders()
    
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    
    
    const sortingWithStatus: SortingFn<Provider> = (rowA, rowB) => {
        return Number(rowA.original.statusProvider) - Number(rowB.original.statusProvider)
    }


    const columns: ColumnDef<Provider>[] = [
        {
            id: 'id',
            accessorKey: '_id',
            header: 'ID',
            cell: (providerContext) => {
    
                const value = providerContext.getValue() as string
                
                const handleClick = (id: string) => {
                    copyToClipboard(id, 'ID')
                }
    
                return (
                    <span
                        onClick={() => {handleClick(value)}}
                        className="cursor-pointer hover:"
                    >
                        {value}
                    </span>
                )
            }
        },
        {
            id: 'name',
            accessorKey: 'nameProvider',
            header: 'Nombre',
        },
        {
            id: 'typeProvider',
            accessorFn: (provider) => provider.idTypeProvider.nameTypeProvider,
            header: 'Tipo de proveedor'
        },
        {
            id: 'note',
            accessorKey: 'noteProvider',
            header: 'Nota'
        },
        {   id: 'state',
            accessorKey: 'statusProvider',
            sortingFn: sortingWithStatus,
            header:({column}) => {
                return(
                    <Button
                        className={headersClassNames}
                        onClick={() => {column.toggleSorting()}}
                    >
                        Estado
                        <ChevronsUpDown className="w-4"/>
                    </Button>
                )
            },
            cell: ({row}) => <div className="grid items-center">{row.original.statusProvider? "Activo" : "Inactivo"}</div>
        },
        {
            id: 'date',
            accessorFn: (provider) => {
                const date = new Date(provider.creationDateProvider)
                console.log(date)
                const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                return formattedDate
            },
            header: 'Fecha de creación'
        },
        {   id: 'edit',
            header: () => {
                // return <span className="flex items-center gap-1">Edit <Edit className="inline" size={15}/></span>
                return <></>
            },
            cell: ({cell}) => {
                const provider = cell.row.original
                return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 bg-transparent">
                    <EllipsisVertical/>
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => copyToClipboard(provider._id, 'ID')}
                >
                  Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {onEditProvider(provider)}}>
                    Editar proveedor
                </DropdownMenuItem>
                <DropdownMenuItem 
                onClick={() => {
                    provider.statusProvider? 
                    disableProvider(provider) : 
                    enableProvider(provider)
                }}
                >
                    {provider.statusProvider? 'Deshabilitar proveedor' : 'Habilitar proveedor'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
                )
            }
        }
    ]

    const table = useReactTable({
        data: providers,
        columns: columns,
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
        <section>
            <div className="flex">
            <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded shadow  flex gap-2 bg-background hover:bg-white  text-foreground ml-auto">
                    <Settings2/>
                    <span>Vista</span>
                </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .filter((column) => column.id != 'edit')
              .map((column, index, array) => {
                if(index == array.length-1) return
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
            <Table className="p-3 mt-4">
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
                    onClick={() => {
                        if (onProviderRowSelection) onProviderRowSelection(row.original)
                    }}
                    >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
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
                    colSpan={columns.length}
                    className="h-24 text-center"
                    >
                    No results.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
    
        </Table>
        </section>
    )
}