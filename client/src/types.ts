import Vue from 'vue'

declare module 'vue/types/vue' {
     interface Vue {
          $baseURL: string;
          $local: (route: string) => string;
     }
}

declare global {
     type LocalFile = {
          file: File;
          meta: {
              _id: string;
              [key: string]: any;
          };
     };
}

export enum FILETYPE {
     OTHER = 0,
     IMAGE = 1,
}
