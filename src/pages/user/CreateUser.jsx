import { useState } from 'react';
import userService from '../../services/userService';

// const CreateUser = () => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'employee',
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');
//     setSubmitting(true);
//     try {
//       await userService.createUser(form);
//       setMessage('User created successfully.');
//       setForm({ name: '', email: '', password: '', role: 'employee' });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create user.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="page">
//       <h2>Create User</h2>
//       <p className="muted">Add a new team member to the system.</p>

//       {message && <div className="alert alert-success">{message}</div>}
//       {error && <div className="alert alert-error">{error}</div>}

//       <form className="form-panel" onSubmit={handleSubmit}>
//         <label>
//           Name
//           <input name="name" value={form.name} onChange={handleChange} required />
//         </label>
//         <label>
//           Email
//           <input type="email" name="email" value={form.email} onChange={handleChange} required />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             minLength={6}
//           />
//         </label>
//         <label>
//           Role
//           <select name="role" value={form.role} onChange={handleChange}>
//             <option value="employee">Employee</option>
//             <option value="manager">Manager</option>
//             <option value="admin">Admin</option>
//           </select>
//         </label>
//         <button type="submit" className="btn btn-primary" disabled={submitting}>
//           {submitting ? 'Creating...' : 'Create User'}
//         </button>
//       </form>
//     </div>
//   );
// };

const CreateUser = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "EMPLOYEE", designation: "DEVELOPER" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleRoleChange = (e) => {
        const role = e.target.value;
        setForm((prev) => ({ ...prev, role, designation: role === "ADMIN" ? "" : "DEVELOPER" }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setSubmitting(true);
        try {
            const userData = {
                name: form.name,
                email: form.email,
                password: form.password,
                role: form.role,
                designation: form.role === "ADMIN" ? null : form.designation,
            };
            await userService.createUser(userData);
            setMessage("User created successfully.");
            setForm({ name: "", email: "", password: "", role: "EMPLOYEE", designation: "DEVELOPER" });
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || "Failed to create user.");
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className="page">
            {" "}
            <h2>Create User</h2> <p className="muted"> Add a new team member to the system. </p>{" "}
            {message && <div className="alert alert-success"> {message} </div>}{" "}
            {error && <div className="alert alert-error"> {error} </div>}{" "}
            <form className="form-panel" onSubmit={handleSubmit}>
                {" "}
                <label>
                    {" "}
                    Name{" "}
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        required
                    />{" "}
                </label>{" "}
                <label>
                    {" "}
                    Email{" "}
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />{" "}
                </label>{" "}
                <label>
                    {" "}
                    Password{" "}
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        minLength={6}
                        required
                    />{" "}
                </label>{" "}
                <label>
                    {" "}
                    Role{" "}
                    <select name="role" value={form.role} onChange={handleRoleChange} required>
                        {" "}
                        <option value="EMPLOYEE">Employee</option> <option value="ADMIN">Admin</option>{" "}
                    </select>{" "}
                </label>{" "}
                {form.role === "EMPLOYEE" && (
                    <label>
                        {" "}
                        Designation{" "}
                        <select name="designation" value={form.designation} onChange={handleChange} required>
                            {" "}
                            <option value="PROJECT_MANAGER"> Project Manager </option>{" "}
                            <option value="DEVELOPER"> Developer </option> <option value="TESTER"> Tester </option>{" "}
                        </select>{" "}
                    </label>
                )}{" "}
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {" "}
                    {submitting ? "Creating..." : "Create User"}{" "}
                </button>{" "}
            </form>{" "}
        </div>
    );
};
export default CreateUser;

// export default CreateUser;
