import React from "react"
import styled from "styled-components"
import { Link, GatsbyLinkProps } from "gatsby"
import { lighten } from "polished"
import { theme } from "../../utils/theme"

const buttonStyle: any = `
text-transform: uppercase;
letter-spacing: 1px;
line-height: 1rem;
padding: .92308rem 2.26923rem;
padding: 12px 32px;
font-size: 13px;
text-align: center;
cursor: pointer;
width: fit-content;
font-weight: 500;
background:  ${theme.darkShades};
background:  ${theme.mainBrandColor};
color:#fff;
border: none;
transition: all .35s ease;

&:hover{
    background: ${theme.lightShades};
    background: ${lighten(0.075, theme.mainBrandColor)};
    color:#fff;
}
`
const AlternatebuttonStyle: any = `
text-transform: uppercase;
letter-spacing: 1px;
line-height: 1rem;
padding: .92308rem 2.26923rem;
padding: 12px 32px;
font-size: 13px;
text-align: center;
cursor: pointer;
width: fit-content;
font-weight: 500;
// background: ${theme.darkAccent};
border: none;
border: 2px solid #fff;
color:#fff;
// color:#202020;
transition: all .35s ease;

&:hover{
    background: ${theme.lightAccent};
    background: #fff;
    color:#202020;
}
`

const ButtonContainer: any = styled.button`
  ${buttonStyle}
  &:focus {
    outline: 2px solid #000;
  }
`

const AlternateButtonContainer: any = styled.button`
  ${AlternatebuttonStyle}
`

const LinkButtonContainer: any = styled(Link)`
  ${buttonStyle}
  &:focus {
    outline: 2px solid #000;
  }
`

const AlternateLinkButtonContainer: any = styled(Link)`
  ${AlternatebuttonStyle}
`

const Button: React.FC<any> = ({ children, color, ...props }) => {
  if (color === "secondary")
    return (
      <AlternateButtonContainer {...props}>{children}</AlternateButtonContainer>
    )
  return <ButtonContainer {...props}>{children}</ButtonContainer>
}

export const LinkButton: React.FC<GatsbyLinkProps<any>> = ({
  children,
  color = "primary",
  ...props
}) => {
  if (color === "secondary")
    return (
      <AlternateLinkButtonContainer {...props}>
        {children}
      </AlternateLinkButtonContainer>
    )
  return <LinkButtonContainer {...props}>{children}</LinkButtonContainer>
}

export default Button
