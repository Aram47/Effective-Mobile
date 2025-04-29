import { start } from './app.js'
import { logger } from './utils/logger.js';

start().listen(Number(process.env.PORT), '0.0.0.0', () => {
  logger.info(`Server listen on PORT: ${process.env.PORT}`);
});