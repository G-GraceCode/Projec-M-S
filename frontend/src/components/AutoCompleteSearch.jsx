import styled from "styled-components";

const AutoCompleteSearch = ({ projects }) => {
  return (
    <Searchresult>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className="result">
            <p>{`Title: ${project.title}`}</p>
            <p>{`Category: ${project.category}`}</p>
          </div>
        ))
      ) : (
        <>No Result Found</>
      )}
    </Searchresult>
  );
};

export default AutoCompleteSearch;

const Searchresult = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  position: absolute;
  left: 0;
  rigth: 0;
  top: 120%;
  width: 430px;
  min-width: 250px;
  padding: 0.5rem 0.7rem;
  outline: none;
  font-size: 14px;
  font-weight: 400;
  //   letter-spacing: 0.4px;
  background-color: var(--natural-white);
  outline: 2px solid transparent;
  z-index: 10;
  border-radius: var(--border-radius);
  margin: 0 0 0 0.2rem;
  box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.2);

  .result {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;
    border-bottom: 2px double var(--color-green);
    width: 100%;

    p {
      margin: 0;
    }
  }
`;
