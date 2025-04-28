import { start } from './app.js'
import { logger } from './utils/logger.js';

start().listen(process.env.PORT, () => {
  logger.info(`Server listen on PORT: ${process.env.PORT}`);
});