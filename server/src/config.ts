/**
 * Shared config file accessible in both the client and the server
 * via import {} from "@C"
 */

/** The route the client will ping to check if the server is a Sourzce server */
export const EXISTS_ROUTE = 'SERVER_EXISTS';
/** Default port to use for the NestJS server */
export const DFT_PORT = 9090;
/** IP that the client will connect to if the server it's hosted from isn't a Sourzce server */
export const DEV_IP = `http://localhost:${DFT_PORT}`;

