import React from "react";
import { Box, styled } from "@mui/material";
import { navData, categoriesData } from "../../data/data";
import { useState, useEffect, useRef } from "react";
import "./home.css";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin: 2px 150px 0 150px;
  position: relative;
  transition: all 0.3s ease;
`;

const Container = styled(Box)`
  padding: 12px 8px;
`;

const Home = () => {
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(-1);

  const handleMouseEnter = (index) => {
    setIsCategoryHovered(true);
    setHoveredCategory(index);
  };

  const handleMouseLeave = () => {
    setIsCategoryHovered(false);
    setHoveredCategory(-1);
  };

  const prevHoveredCategoryRef = useRef(-1);

  useEffect(() => {
    prevHoveredCategoryRef.current = hoveredCategory;
  }, [hoveredCategory]);

  const prevHoveredCategory = prevHoveredCategoryRef.current;

  return (
    <Component className="navData">
      {navData.map((data, index) => (
        <Container key={index}>
          <img
            src={data.url}
            style={{ width: 65 }}
            alt="dropdown"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
          {isCategoryHovered && hoveredCategory === index && (
            <Container className="showCategories">
              {categoriesData[index].name}
              <Container>
                {categoriesData[index].subcategories.map((subcategory) => (
                  <Container key={subcategory.id}>{subcategory.name}</Container>
                ))}
              </Container>
            </Container>
          )}
        </Container>
      ))}
    </Component>
  );
};

export default Home;
