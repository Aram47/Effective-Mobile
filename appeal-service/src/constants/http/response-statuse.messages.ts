export const RESPONSE_MESSAGES = {
  SUCCESS: {
    CREATED: 'Appeal created successfully.',
    UPDATED: 'Appeal updated successfully.',
    STARTED: 'Appeal has been taken in progress.',
    COMPLETED: 'Appeal completed successfully.',
    CANCELED: 'Appeal canceled successfully.',
    CANCELLED_ALL_IN_PROGRESS: 'All appeals with "in progress" status have been canceled.',
    LIST_FETCHED: 'Appeals list fetched successfully.',
  },
  ERROR: {
    VALIDATION_ERROR: 'Validation error. Please check your input.',
    NOT_FOUND: 'Appeal not found.',
    ALREADY_IN_PROGRESS: 'The appeal is already in progress.',
    ALREADY_COMPLETED: 'The appeal has already been completed.',
    ALREADY_CANCELED: 'The appeal has already been canceled.',
    INVALID_STATUS: 'Invalid operation for the current appeal status.',
    INTERNAL_SERVER: 'An internal server error occurred.',
  }
};