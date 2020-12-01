import React, { useState, InputHTMLAttributes } from "react"
import styled from "styled-components"
import { theme } from "../../utils/theme"

type InputComponent = {
  label?: string
  id?: string
  defaultValue?: string
  onInputChange?: (val: string) => void
} & InputHTMLAttributes<HTMLInputElement>

const InputContainer: any = styled.div`
  label {
    display: block;
    letter-spacing: 1px;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
  input {
    transition: 0.25s ease;
    border: 1px solid #ccc;
    padding: 10px 12px;
    font-size: 14px;
    width: 100%;

    &:focus {
      box-shadow: 0 0 0 1px ${theme.primaryColor};
      border: 1px solid ${theme.primaryColor};
      outline: none;
    }
  }
`

const Input: React.FC<InputComponent> = ({
  label,
  onInputChange,
  children,
  defaultValue = "",
  id,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue)

  const handleInput = (e): void => {
    const value: string = e.target.value
    setInputValue(value)
    onInputChange && onInputChange(value)
  }

  return (
    <InputContainer>
      {label && <label htmlFor={id || ""}>{label}</label>}
      <input
        type="text"
        id={id || " "}
        value={inputValue}
        {...props}
        onChange={handleInput}
      />
      {children}
    </InputContainer>
  )
}

export default Input
