import { useProductsHistoricalData } from "@/hooks/useProductsHistoricalData"
import { ProductsHistoricalData } from "@/types/historical/ProductsHistoricalData"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"
import { useState } from "react"
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
import { Avatar, AvatarFallback } from "../ui/avatar"

export function HistoricalDataTable(){

    const { historicalData, isFetchingHistoricalData } = useProductsHistoricalData()

    if(!historicalData) return <></>

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
      useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})


    const columns: ColumnDef<ProductsHistoricalData>[] = [
        {
            id: 'user',
            header: () => {
                return (
                    <strong className="text-center">Usuario</strong>
                )
            },
            accessorFn: (historical) => {
                console.log(historical)
                return historical.idUser.username
            },
            cell: ({cell}) => {

                const username = cell.getValue() as string
                const initials = username.slice(0,2).toUpperCase()
                return (
                    <div className="flex gap-2 items-center">
                        <figure>
                            <Avatar>
                                <AvatarFallback>
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </figure>
                        <span>{username}</span>
                    </div>
                )
            }
        },
        {
            id: 'product',
            header: () => {
                return <strong>Producto</strong>
            },
            accessorFn: (historical) => historical.idProduct.nameProduct,
            cell: ({cell}) => {
                return <span>{cell.getValue() as string}</span>
            }
        },
        {
            id: 'movement',
            accessorFn: (historical) => {
                return historical.idMovementType.nameMovementType
            },
            header: () => {
                return (
                    <strong>Tipo de movimiento</strong>
                )
            },
            cell: ({cell}) => {
                const movimiento = cell.getValue() as string
                const formattedMovimiento = movimiento.charAt(0).toUpperCase() + movimiento.slice(1, movimiento.length).toLowerCase()
                
                return (
                    <span>{formattedMovimiento}</span>
                )
            }
        },
        {
            id: 'date',
            accessorKey: 'dateMovement',
            header: () => {
                return <strong>Fecha</strong>
            },
            cell: ({cell}) => {
                const dateString = cell.getValue() as string
                const date = new Date(dateString)

                const formattedDate = date.toLocaleTimeString('es-MX', {month: 'short', year: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})

                return (
                    <span>{formattedDate}</span>
                )
            }
        }
    ]

    const table = useReactTable({
        data: historicalData,
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
        <>
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
                            colSpan={historicalData.length}
                            className="h-24 text-center"
                            >
                            No results.
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
        </>
    )
}