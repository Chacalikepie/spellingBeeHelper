import styled from "styled-components";

export const HexagonContainer = styled.div`
    position: absolute;
    width: 100px;
    height: 89px;
    margin: 20px auto;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    background: #FFDE21;
    padding: 0.75rem 1.5rem;
    transition: background 0.3s ease, transform 0.2s ease;
    &:hover {
        background: #fcd700;
        transform: scale(1.05);
    }
`;

export const HexagonInput  = styled.input`
    cursor: text;
    position: absolute;
    width: full;
    height: full;
    font: bold 1.5rem sans-serif;
    font-weight: bold;
    background: transparent;
    border: none;
    outline: none;
    caret: transparent;
    text-align: center;
    inset: 0;
    maxLength: 1;
`;

export const Button = styled.button`
  background: #FFDE21;
  color: #000;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  &:hover {
    background: #fcd700;
    transform: scale(1.05);
  }
`;

export const SmallButton = styled.button`
  background: #FFDE21;
  color: #000;
  padding: 0.75rem 0.75rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  margin: 0 2px;
  &:hover {
    background: #fcd700;
    transform: scale(1.05);
  }
  font-size: 0.8rem;
`;

export const TableHeader = styled.th`
    background: #FFDE21;
    text-align: center;
    font-weight: bold;
    padding: 0.5rem;
    border: 1px solid #ddd;
    radius: 5px;
`;