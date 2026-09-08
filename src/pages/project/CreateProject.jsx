import { useState } from 'react';
import projectService from '../../services/projectService';

const CreateProject = () => {
  // const [form, setForm] = useState({
  //   name: '',
  //   description: '',
  //   startDate: '',
  //   endDate: '',
  //   status: 'active',
  // });

  const [form, setForm] = useState({ projectName: '', projectDescription: '', });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setSubmitting(true);
    try {
      await projectService.createProject(form);
      setMessage('Project created successfully.');
      setForm({ projectName: '', projectDescription: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
        {" "}
        <h2>Create Project</h2> <p className="muted"> Set up a new project for your team. </p>{" "}
        {message && <div className="alert alert-success"> {message} </div>}{" "}
        {error && <div className="alert alert-error"> {error} </div>}{" "}
        <form className="form-panel" onSubmit={handleSubmit}>
            {" "}
            <label>
                {" "}
                Project Name{" "}
                <input
                    type="text"
                    name="projectName"
                    value={form.projectName}
                    onChange={handleChange}
                    placeholder="Enter project name"
                    required
                />{" "}
            </label>{" "}
            <label>
                {" "}
                Project Description{" "}
                <textarea
                    name="projectDescription"
                    value={form.projectDescription}
                    onChange={handleChange}
                    placeholder="Enter project description"
                    rows={5}
                />{" "}
            </label>{" "}
            <button type="submit" className="btn btn-primary" disabled={submitting}>
                {" "}
                {submitting ? "Creating..." : "Create Project"}{" "}
            </button>{" "}
        </form>{" "}
    </div>
);

  // return (
  //   <div className="page">
  //     <h2>Create Project</h2>
  //     <p className="muted">Set up a new project for your team.</p>

  //     {message && <div className="alert alert-success">{message}</div>}
  //     {error && <div className="alert alert-error">{error}</div>}

  //     <form className="form-panel" onSubmit={handleSubmit}>
  //       <label>
  //         Project Name
  //         <input name="name" value={form.name} onChange={handleChange} required />
  //       </label>
  //       <label>
  //         Description
  //         <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
  //       </label>
  //       <div className="form-row">
  //         <label>
  //           Start Date
  //           <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
  //         </label>
  //         <label>
  //           End Date
  //           <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
  //         </label>
  //       </div>
  //       <label>
  //         Status
  //         <select name="status" value={form.status} onChange={handleChange}>
  //           <option value="active">Active</option>
  //           <option value="on-hold">On Hold</option>
  //           <option value="completed">Completed</option>
  //         </select>
  //       </label>
  //       <button type="submit" className="btn btn-primary" disabled={submitting}>
  //         {submitting ? 'Creating...' : 'Create Project'}
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default CreateProject;
