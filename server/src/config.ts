/**
 * Shared config file accessible in both the client and the server
 * via import {} from "@C"
 * 
 * # If you are modifying sourzce, add global variables here!
 */

const UPLOAD_PREFIX = '/upload'

/** The route the client will ping to check if the server is a Sourzce server */
export const EXISTS_ROUTE = 'SERVER_EXISTS';
/** The default file upload routes */
export const UPLOAD_ROUTES = {
    FILES: UPLOAD_PREFIX,
    PDF:  UPLOAD_PREFIX + '/pdf',
    VIDEO_STREAM:  UPLOAD_PREFIX + '/video-stream',
};
/** Default port to use for the NestJS server */
export const DFT_PORT = 9090;
/** IP that the client will connect to if the server it's hosted from isn't a Sourzce server */
export const DEV_IP = `http://localhost:${DFT_PORT}`;

export const FILE_MODES = {
    DELETE: "delete",
    SELECT: "select"
}