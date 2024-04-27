import { Table, TableBody, TableHeader, TableRow, TableCell, TableHead } from "./ui/table"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Provider } from "@/types/providers/Provider"
import useProviders from "@/hooks/useProviders"
import { toast } from "./ui/use-toast"
import { Edit, EllipsisVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuContent } from "./ui/dropdown-menu"
import { Button } from "./ui/button"


interface ProviderTableProps {
    onEditProvider: (provider: Provider) => void
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



export default function ProvidersTable({onEditProvider}: ProviderTableProps){
    const { providers, enableProvider, disableProvider } = useProviders()
    

    const columns: ColumnDef<Provider>[] = [
        {
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
            accessorKey: 'nameProvider',
            header: 'Name',
        },
        {
            accessorFn: (provider) => provider.idTypeProvider.nameTypeProvider,
            header: 'Provider type'
        },
        {
            accessorKey: 'noteProvider',
            header: 'Note'
        },
        {
            accessorFn: (provider) => {
                console.log(provider.statusProvider)
                return provider.statusProvider? 'Active' : 'Inactive'
            },
            header: 'Status'
        },
        {
            accessorFn: (provider) => {
                const date = new Date(provider.creationDateProvider)
                console.log(date)
                const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                return formattedDate
            },
            header: 'Created at'
        },
        {   id: 'edit',
            header: () => {
                return <span className="flex items-center gap-1">Edit <Edit className="inline" size={15}/></span>
            },
            cell: ({cell}) => {
                const provider = cell.row.original
                return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 bg-transparent">
                    <EllipsisVertical/>
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => copyToClipboard(provider._id, 'ID')}
                >
                  Copy provider ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {onEditProvider(provider)}}>
                    Edit provider
                </DropdownMenuItem>
                <DropdownMenuItem 
                onClick={() => {
                    provider.statusProvider? 
                    disableProvider(provider) : 
                    enableProvider(provider)
                }}
                >
                    {provider.statusProvider? 'Disable provider' : 'Enable provider'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
                )
            }
        }
    ]

    const table = useReactTable({
        data: providers,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <section>
            <Table className="p-3">
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