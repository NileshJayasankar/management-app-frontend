import { useState } from 'react';
import leaveService from '../../services/leaveService';

const ApplyLeave = () => {
  const [form, setForm] = useState({
    leaveType: 'casual',
    fromDate: '',
    toDate: '',
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
      await leaveService.applyLeave(form);
      setMessage('Leave application submitted.');
      setForm({ leaveType: 'casual', fromDate: '', toDate: '', reason: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply leave.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <h2>Apply Leave</h2>
      <p className="muted">Submit a new leave request.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <form className="form-panel" onSubmit={handleSubmit}>
        <label>
          Leave Type
          <select name="leaveType" value={form.leaveType} onChange={handleChange}>
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
            <option value="earned">Earned</option>
          </select>
        </label>
        <div className="form-row">
          <label>
            From
            <input type="date" name="fromDate" value={form.fromDate} onChange={handleChange} required />
          </label>
          <label>
            To
            <input type="date" name="toDate" value={form.toDate} onChange={handleChange} required />
          </label>
        </div>
        <label>
          Reason
          <textarea name="reason" value={form.reason} onChange={handleChange} rows={4} required />
        </label>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Apply Leave'}
        </button>
      </form>
    </div>
  );
};

export default ApplyLeave;
