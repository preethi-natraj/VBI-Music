const outputData = require('./format');

/**
 * @description
 *
 *   Sending the error response message.
 *
 * @param msg - error message
 * @param code - error code
 * @param sessionValidity
 * @param sessionToken
 */
function formatErrorMessage (msg, code = 400, sessionToken = null) {
  outputData.session.token = sessionToken;
  outputData.session.validity = !sessionToken ? 0 : 1;
  outputData.session.specialMessage = null;

  outputData.data = {};
  outputData.status.code = code;
  outputData.status.status = 'Error';
  outputData.status.message = msg;
  return outputData;
}

/**
 * @description
 *
 * Sending the success message
 *
 * @param msg - status message
 * @param data - response data
 * @param sessionToken
 * @param sessionValidity
 * @param sessionMessage
 * @param statusCode
 */
function formatSuccessMessage (
  msg,
  data = {},
  sessionToken = null,
  sessionValidity = 0,
  sessionMessage = null,
  statusCode = 200
) {
  outputData.session.token = sessionToken;
  outputData.session.validity = sessionValidity;
  outputData.session.specialMessage = sessionMessage;

  outputData.data = data;
  outputData.status.code = statusCode;
  outputData.status.status = 'Success';
  outputData.status.message = msg;

  return outputData;
}

module.exports = { formatErrorMessage, formatSuccessMessage };
