import { Link, useFetcher } from "react-router-dom";
import {formatCurrency,formatDateToLocaleString,getAllMatchingItems,} from "../helpers";

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={{
              "--accent": budget.color,
            }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className=""
            aria-label={`Delete ${expense.name} expense`}
          >
           <div>
            <button className=" rounded-lg bg-red-900 text-white  hover:bg-red-500">
              <span className="p-2 m-2">Delete</span>
            </button>
           </div>
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};
export default ExpenseItem;
