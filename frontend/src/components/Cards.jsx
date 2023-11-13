import styled from "styled-components";
import { BsPlusCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

const Cards = () => {
  return (
    <Projectlist>
      <div className="carts">
        <Card>
          <img src="/images/flyer.png" className="image" alt="img" />
          <div className="Category">
            <h4>UI/UX Design</h4>
          </div>
          <div className="Icons">
            <FiEdit className="icon" />
            <AiFillDelete className="icon-2" />
          </div>
          <div className="Detail">
            <h4>How I Design a UI/UX Design</h4>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
              explicabo veniam reiciendis repellendus voluptatem? Asperiores
              sunt corrupti vero natus consequatur blanditiis voluptas.
            </p>
          </div>
          
        </Card>
       
        <Card>
          <img src="/images/flyer.png" className="image" alt="img" />
          <div className="Category">
            <h4>UI/UX Design</h4>
          </div>
          <div className="Icons">
            <FiEdit className="icon" />
            <AiFillDelete className="icon-2" />
          </div>
          <div className="Detail">
            <h4>How I Design a UI/UX Design</h4>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
              explicabo veniam reiciendis repellendus voluptatem? Asperiores
              sunt corrupti vero natus consequatur blanditiis voluptas.
            </p>
          </div>
        </Card>
        <Card>
          <img src="/images/flyer.png" className="image" alt="img" />
          <div className="Category">
            <h4>UI/UX Design</h4>
          </div>
          <div className="Icons">
            <FiEdit className="icon" />
            <AiFillDelete className="icon-2" />
          </div>
          <div className="Detail">
            <h4>How I Design a UI/UX Design</h4>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
              explicabo veniam reiciendis repellendus voluptatem? Asperiores
              sunt corrupti vero natus consequatur blanditiis voluptas.
            </p>
          </div>
        </Card>
      </div>
    </Projectlist>
  );
};

export default Cards;

const Projectlist = styled.div`
  padding: 0.4rem 1.5rem;
  overflow-y: scroll;
  & > .carts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(250px), 1fr));
    row-gap: 0.8rem;
    margin: 0.85rem;
    overflow-y: scroll;
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-flow: column nowrap;
  text-align: center;
  background-color: var(--natural-white);
  width: 300px;
  color: var(--color-bg-2);
  height: 240px;
  max-height: 240px;
  min-height: 150px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: var(--border-radius);
  z-index: 1;

  .image {
    display: block;
    width: 100%;
    object-fit: contain;
    transform: Translate(0) scale(1);
    transition: transform var(--transition);
  }
  .Category {
    position: absolute;
    top: 2%;
    text-align: center;
    background-color: var(--color-green);
    padding: 0.4rem 0.5rem 0 0.5rem;
    border-radius: var(--border-radius);
    h4 {
      color: var(--natural-white);
      font-size: 18px;
    }
  }
  .Icons {
    position: absolute;
    right: 5%;
    bottom: 5%;
    z-index: 1000;
    font-size: 18px;
    padding: 0.1rem 0.5rem;
    background-color: var(--color-bg-2);
    color: var(--natural-white);
    border-radius: var(--border-radius);
    .icon {
      margin-right: 8px;
    }
    .icon-2 {
      color: red;
    }
  }
  .Detail {
    position: absolute;
    bottom: -200%;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 0.8rem;
    border-radius: 10px 10px 0 0;
    background-color: var(--natural-white);
    transition: bottom var(--transition);
    h4 {
      font-size: 18px;
      text-align: left;
      letter-spacing: 1px;
    }
    p {
      font-size: 14px;
      text-align: left;
      word-spacing: 1px;
    }
  }

  &:hover {
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.15);
    border: 2px solid var(--color-green);
    transition: border var(--transition);

    .Detail {
      bottom: 0;
      transition: bottom var(--transition);
    }
  }
`;
