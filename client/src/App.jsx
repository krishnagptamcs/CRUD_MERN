import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [updateForm, setUpdateForm] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, email, age };
      const response = await axios.post(
        "http://localhost:5000/api/users",
        newUser
      );
      setUsers([...users, response.data]);
      setName("");
      setEmail("");
      setAge("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async (e, id) => {
    e.preventDefault();
    try {
      const updatedUser = { name, email, age };
      const response = await axios.put(
        `http://localhost:5000/api/users/${id}`,
        updatedUser
      );
      const updatedUsers = users.map((user) =>
        user._id === id ? response.data : user
      );
      setUsers(updatedUsers);
      setUpdateForm(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen w-screen bg-black">
        <section className=" bg-black">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover object-top"
                  src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

              <div className="relative">
                <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
                  <h3 className="text-4xl font-bold text-white">
                    Empower your business with our employee creation!
                  </h3>
                </div>
              </div>
            </div>

            {/* right part  */}

            <div className=" w-full h-full mt-8">
              <div className="flex flex-col gap-5">
                <div>
                  <h1 className="text-center text-2xl font-bold text-white">
                    Employee Form
                  </h1>
                </div>

              

                <div className="mx-auto">
                  <form
                    onSubmit={handleCreateUser}
                    className="flex flex-col justify-center items-center gap-8 w-[400px] mt-5 mb-0"
                  >
                    <div className="flex justify-between  gap-5">
                      <div className="w-[50%] mx-auto text-base font-medium text-gray-200">
                        <label>Employee Name</label>
                      </div>
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className=" bg-slate-500  focus:border-black w-[60%] rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 dark:border-gray-700 dark:text-gray-50  text-white "
                      />
                    </div>

                    <div className="flex justify-between gap-5">
                      <div className="w-[50%] mx-auto text-base font-medium text-gray-200">
                        <label>Employee Email</label>
                      </div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className=" bg-slate-500  focus:border-black w-[60%] rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 dark:border-gray-700 dark:text-gray-50  text-white "
                      />
                    </div>

                    <div className="flex justify-between gap-5">
                      <div className="w-[50%] mx-auto text-base font-medium text-gray-200">
                        <label>Employee Age</label>
                      </div>
                      <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        className=" bg-slate-500  focus:border-black w-[60%] rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 dark:border-gray-700 dark:text-gray-50  text-white "
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-500 hover:bg-green-600 capitalize"
                    >
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-[600px] mx-auto  mt-10 bg-black">
          <div className="mx-auto  flex flex-col gap-5">
            <h2 className="text-center bg-slate-200 py-2 rounded-sm">All Employee Record</h2>
            <ul className="flex flex-col gap-3">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="flex gap-4 justify-center items-center  border-2 border-gray-500 rounded-md px-2 py-2"
                >
                  <div className="w-[60%] flex justify-between px-2 text-gray-300">
                    <span>{user.name}</span> |<span>{user.email} </span> |
                    <span>{user.age}</span>
                  </div>

                  <div className="flex gap-8 w-[40%] pl-6">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-3 py-2 bg-red-400 hover:bg-red-500 text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setUpdateForm(user)}
                      className="px-3 py-2 bg-blue-400 hover:bg-blue-500 text-sm rounded-md"
                    >
                      Update
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {updateForm && (
              <div>
                <h2 className="text-center bg-slate-400">Update User</h2>
                <form
                  className="flex flex-col justify-center items-center gap-4 w-full mt-5"
                  onSubmit={(e) => handleUpdateUser(e, updateForm._id)}
                >
                  <div className="flex justify-evenly  gap-5">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className=" bg-slate-500  focus:border-black w-[60%] rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 dark:border-gray-700 dark:text-gray-50  text-white "
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className=" bg-slate-500  focus:border-black w-[60%] rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 dark:border-gray-700 dark:text-gray-50  text-white "
                    />

                    <input
                      type="number"
                      placeholder="Age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                      className=" bg-slate-500  focus:border-black w-[60%] rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 dark:border-gray-700 dark:text-gray-50  text-white "
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-sm rounded-md"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setUpdateForm(null)}
                      className="px-3 py-2 bg-red-400 hover:bg-red-500 text-sm rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
