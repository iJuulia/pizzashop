import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationLink,
  PaginationItem,
} from '@/components/ui/pagination'

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <PaginationRoot className='flex items-center justify-between'>
      <span className='text-sm text-muted-foreground'>
        Total de {totalCount} itens
      </span>
      <div className='flex items-center gap-6 lg:gap-8'>
        <div className='text-sm font-medium'>
          Página {pageIndex + 1} de {pages}
        </div>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              title='Primeira página'
              onClick={() => onPageChange(0)}
              disabled={pageIndex === 0}>
              <ChevronsLeft className='size-4' />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              title='Página anterior'
              onClick={() => onPageChange(pageIndex - 1)}
              disabled={pageIndex === 0}>
              <ChevronLeft className='size-4' />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              title='Próxima página'
              onClick={() => onPageChange(pageIndex + 1)}
              disabled={pages <= pageIndex + 1}>
              <ChevronRight className='size-4' />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              title='Última página'
              onClick={() => onPageChange(pages - 1)}
              disabled={pages <= pageIndex + 1}>
              <ChevronsRight className='size-4' />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </div>
    </PaginationRoot>
  )
}
