import { useState } from 'react';
import permissionService from '../../services/permissionService';

const ApplyPermission = () => {
  const [form, setForm] = useState({
    date: '',
    fromTime: '',
    toTime: '',
    reason: '',
  });
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
      await permissionService.applyPermission(form);
      setMessage('Permission request submitted.');
      setForm({ date: '', fromTime: '', toTime: '', reason: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply permission.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <h2>Apply Permission</h2>
      <p className="muted">Request short-duration permission.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <form className="form-panel" onSubmit={handleSubmit}>
        <label>
          Date
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>
        <div className="form-row">
          <label>
            From Time
            <input type="time" name="fromTime" value={form.fromTime} onChange={handleChange} required />
          </label>
          <label>
            To Time
            <input type="time" name="toTime" value={form.toTime} onChange={handleChange} required />
          </label>
        </div>
        <label>
          Reason
          <textarea name="reason" value={form.reason} onChange={handleChange} rows={4} required />
        </label>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Apply Permission'}
        </button>
      </form>
    </div>
  );
};

export default ApplyPermission;
