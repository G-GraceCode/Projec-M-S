import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { BsPlusCircleFill } from "react-icons/bs";

const Search = ({
  present,
  seachValue,
  search,
  year,
  month,
  sort,
  monthValue,
  yearValue,
  sortValue,
}) => {
  return (
    <Searchproject>
      <Sortby>
        Sort by:
        <select value={sort} onChange={sortValue}>
          <option>Search For</option>
          <option>Complete</option>
          <option>Uncomplete</option>
          <option>Old Project</option>
          <option>New Projects</option>
        </select>
        <select id="mounth" value={month} onChange={monthValue}>
          <option value="hide">-- Month --</option>
          <option value="january">January</option>
          <option value="february">February</option>
          <option value="march">March</option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
          <option value="september">September</option>
          <option value="october">October</option>
          <option value="november">November</option>
          <option value="december">December</option>
        </select>
        <select id="year" value={year} onChange={yearValue}>
          <option value="hide">-- Year --</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </Sortby>
      <form onSubmit={(e) => e.preventDefault()} className="searchbar">
        <IoIosSearch className="search_icon" />
        <input
          type="text"
          name="search"
          className="search"
          placeholder="Search by Project Category"
          value={search}
          onChange={seachValue}
        />
      </form>
      <Addproject onClick={present}>
        <BsPlusCircleFill className="icon" /> Add Project
      </Addproject>
    </Searchproject>
  );
};

export default Search;

const Searchproject = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row wrap;
  text-align: center;
  margin: 0 1rem 2rem 1rem;
  padding: 0 1.5rem;
  gap: 0.7rem;

  & > .searchbar {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    position: relative;

    .search_icon {
      border-right: 2px doudle var(--color-bg);
      position: absolute;
      left: 5%;
      top: 30%;
    }

    input[type="text"] {
      width: 400px;
      min-width: 250px;
      flex: 1;
      padding: 0.5rem 0.7rem 0.5rem 2.3rem;
      outline: none;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.4px;
      background-color: var(--natural-white);
      outline: 2px solid transparent;
      border-radius: var(--border-radius-2);
    }
    input[type="text"]:focus {
      outline: 2px solid var(--color-green);
      outline-offset: 3px;
      width: 430px;
      transition: outline var(--transition);
      transition: width var(--transition);
    }
  }
`;

const Addproject = styled.button`
  border-radius: var(--border-radius-2);
  padding: 0.4rem 0.8rem;
  font-size: 14px;
  border: none;
  background-color: var(--color-green);
  color: var(--natural-white);
  .icon {
    font-size: 14px;
    margin-right: 0 3px 1px 0;
    transform: rotate(180deg);
    transition: transform var(--transition);
  }
`;

const Sortby = styled.div`
  display: flex;
  gap: 0.5rem;
  // margin: auto;
  border: none;
  color: var(--natural-white);
  align-items: center;
  select {
    padding: 0.4rem 0.8rem;
    font-size: 12px;
    border: none;
    outline: none;
    border-radius: var(--border-radius);
    appearance: none;

    option {
      background-color: var(--natural-white);
    }
    option:selected {
      font-weight: bold;
    }
    &::-ms-expand {
      display: none;
    }

    &:hover {
      border-color: #ccc;
    }

    &:active {
      border-color: #bbb;
    }
  }

  select:hover {
    background-color: #ddd;
  }
`;
