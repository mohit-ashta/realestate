import { ReactNode } from "react";

export interface productProps {
  name: string;
  description: string;
  price: string;
  images: string;
  createAt: string;
}

export interface LoginFormProps {
  email: string;
  password: string;
  handleLogin?: () => void;
}

export interface SignUpFormProps {
  name: string;
  email: string;
  password: string;
  handleSignup?: () => void;
}

export interface ErrorResponse {
  message: string;
}

export interface ModalProps {
  children?: JSX.Element;
  buttonText: string;
  buttonIcon?: JSX.Element;
  width?: string;
  className?: string;
  
}

export interface SlideProps {
  title: string;
  id: number;
}

export interface NewHomeProps {
  name: string;
  description: string;
  price: number;
  bedroom: number;
  bathrooms: number;
  size: number;
  floor: number;
  renovation: string;
  constructionYear: number;
  garage: string;
  furnishing: string;
  address: string;
  images: FileList;
}

export interface UpdateHomeProps {
  _id:any;
  name: string;
  description: string;
  price: number;
  bedroom: number;
  bathrooms: number;
  size: number;
  floor: number;
  renovation: string;
  constructionYear: number;
  garage: string;
  furnishing: string;
  address: string;
  images: FileList;
}

export interface userInfoProps {
  id?: number;
  email?: string;
  role?: string;
  exp?: any;
  iat?: any;
}

export interface HeaderMenuProps {
  title: string;
  link: string;
}

export interface FooterMenuProps {
  title: string;
  icon?: ReactNode;
  link: string;
}

export interface FooterHeadingProps {
  title: string;
}

export interface LogoProps {
  width: number;
  height: number;
}

export interface SocialIconsProps {
  icon: ReactNode;
  link: string;
}

export interface SidebarMenuProps {
  title: string;
  icon: ReactNode;
  link: string;
  className?: string;
}