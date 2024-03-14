import { Form } from "react-router-dom"

// library
import { UserPlusIcon } from "@heroicons/react/24/solid";

const Intro = () => {
  return (
    <div className="intro flex border-2 shadow-2xl p-4 m-2 gap-10 w-[600px]">
      <div>
        <h1>
        <span className="accent">Your Money</span> is Important
        </h1>
        <p>
         Budget right Now, spend Later
        </p>
        <div className="flex flex-col justify-center items-center">
          <Form method="post">
            <input
              type="text"
              name="userName"
              required
              className="border-2  border-aqua-200  rounded-lg "
              placeholder="What is your name?" aria-label="Your Name" autoComplete="given-name"
            />
            <input type="hidden" name="_action" value="newUser" />
            <button type="submit" className="btn btn--dark p-2 m-2 hover:bg-teal-500 ">
              <span>Create Account</span>
              <UserPlusIcon width={20} />
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default Intro