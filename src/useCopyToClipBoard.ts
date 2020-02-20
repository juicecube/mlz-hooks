import * as copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

interface CopyOptions {
  callback?:(isSuccess:boolean) => void; // 成功或者失败的回调
  debug?:boolean; // Optional. Enable output to console.
  message?:string; //  Optional. Prompt message
  format?:string; // MIME type, Optional. Set the MIME type of what you want to copy as. Use text/html to copy as HTML, text/plain to avoid inherited styles showing when pasted into rich text editor.
}

export interface CopyToClipboardState {
  value?:string; // 复制的值
  isSuccess:boolean; // 复制是否成功
  error?:Error; // 复制失败信息
}


const useCopyToClipboard = (options?:CopyOptions):[CopyToClipboardState, (value:string) => void] => {
  const [ state, setState ] = useState<CopyToClipboardState>({
    value: undefined,
    error: undefined,
    isSuccess: false,
  });

  const copyToClipboard = useCallback((value) => {

    try {
      if (process.env.NODE_ENV === 'development') {
        if (typeof value !== 'string') {
          console.error(`Cannot copy typeof ${typeof value} to clipboard, must be a string`);
        }
      }

      const isSuccess = copy(value, options);
      options?.callback?.(isSuccess);

      setState({
        value,
        error: undefined,
        isSuccess,
      });
    } catch (error) {
      setState({
        value: undefined,
        error,
        isSuccess: false,
      });
    }
  }, []);

  return [state, copyToClipboard];
};

export default useCopyToClipboard;
