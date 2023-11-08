export type ButtonCProps = {
  size:ButtonCSize;
  variant:ButtonCVariant;
  children:React.ReactNode;
  onClick?:() => void;
  type?:ButtonCTypeVariant;
  disabled?:boolean;
};

export type ButtonCSize = 'small' | 'medium' | 'large';

export type ButtonCVariant = 'primary' | 'secondary';

export type ButtonCTypeVariant = 'button' | 'submit' | 'reset';

export type ButtonCSizeStyles = {
  padding:string;
  fontWeight:number;
};

export type ButtonCColorStyles = {
  backgroundColor:string;
  color:string;
  '&:hover':{
    backgroundColor:string;
    color?:string;
  };
  '&:active':{
    backgroundColor:string;
    color?:string;
  };
  '&:disabled':{
    backgroundColor:string;
    color?:string;
    cursor?:string;
  };
};
