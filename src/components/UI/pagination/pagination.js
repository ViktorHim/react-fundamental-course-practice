import { usePagination } from "../../../hooks/usePagination";
import classes from './pagination.module.css'

const Pagination = ({totalPages, currentPage, setCurrentPage}) => {

  const pagesArray = usePagination(totalPages);

  return (
    <div className={classes.pageWrapper}>
        {pagesArray.map(p =>
            <span
                onClick={() => setCurrentPage(p)}
                key={p}
                className={p !== currentPage ? classes.page : [classes.page, classes.active].join(' ')}
            >
                {p}
            </span>
            )
        }
    </div>
  )
}

export default Pagination;