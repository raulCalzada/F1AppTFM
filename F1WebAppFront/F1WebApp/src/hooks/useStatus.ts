import { useState } from 'react';
import { ApiState } from '../types/common';


export const useStatus = () => {
  const [apiState, setApiState] = useState<ApiState>({
    loading: false,
    error: false,
    success: false,
    message: '',
  });

  const onLoading = () => {
    setApiState({
      loading: true,
      error: false,
      success: false,
      message: '',
    });
  };

  const onSuccess = (message: string = '') => {
    setApiState({
      loading: false,
      error: false,
      success: true,
      message,
    });
  };

  const onError = (message: string = '') => {
    setApiState({
      loading: false,
      error: true,
      success: false,
      message,
    });
  };

  const resetStatus = () => {
    setApiState({
      loading: false,
      error: false,
      success: false,
      message: '',
    });
  };

  return {
    status: apiState,
    onLoading,
    onSuccess,
    onError,
    resetStatus,
  };
};

export const useStatus2 = () => {
  const [apiState, setApiState] = useState<ApiState>({
    loading: false,
    error: false,
    success: false,
    message: '',
  });

  const onLoading2 = () => {
    setApiState({
      loading: true,
      error: false,
      success: false,
      message: '',
    });
  };

  const onSuccess2 = (message: string = '') => {
    setApiState({
      loading: false,
      error: false,
      success: true,
      message,
    });
  };

  const onError2= (message: string = '') => {
    setApiState({
      loading: false,
      error: true,
      success: false,
      message,
    });
  };

  const resetStatus2 = () => {
    setApiState({
      loading: false,
      error: false,
      success: false,
      message: '',
    });
  };

  return {
    status: apiState,
    onLoading2,
    onSuccess2,
    onError2,
    resetStatus2,
  };
};

