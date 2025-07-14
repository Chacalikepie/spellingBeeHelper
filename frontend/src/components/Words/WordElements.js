import styled from "styled-components";

export const Button = styled.button`
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

export const DeleteButton = styled.button`
  background: #ac7f5d;
  color: #000;
  padding: 0.75rem 0.75rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  margin: 0 2px;
  &:hover {
    background:#947157;
    transform: scale(1.05);
  }
  font-size: 0.8rem;
`;

export const TableData = styled.td`
    border-bottom: 1px solid #ddd;
    text-align: center;
`;

export const TableHeader = styled.th`
    background: #FFDE21;
    text-align: center;
    font-weight: bold;
    padding: 0.5rem;
    border: 1px solid #ddd;
    radius: 5px;
`;