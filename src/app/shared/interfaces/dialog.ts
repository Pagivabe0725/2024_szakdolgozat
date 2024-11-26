export interface Dialog {
  width: '50%' | '60%' | '70%';
  height: '50%' | '60%' | '70%';
  hostComponent: string;
  title:string;
  content:string;
  action:boolean;
}
