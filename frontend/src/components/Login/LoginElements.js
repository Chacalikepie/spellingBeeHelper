import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  height: 100vh;
  background: linear-gradient(to bottom right, #FFDE21, #fdf8dd);
`;

export const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  background:rgb(255, 222, 33, 0);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: #FFDE21;
    transform: scale(1.05);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

export const LoginCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;
