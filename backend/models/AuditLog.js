const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  adminId: {
    type: String,
    required: false
  },
  resolvedCategory: {
    type: String,
    required: false
  },
  timeToResolveDays: {
    type: Number,
    required: false
  }
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
