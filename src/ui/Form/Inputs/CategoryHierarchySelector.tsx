import React from "react";
import InputWithSuggestions from "./InputWithSuggestions";
import { Col, Row } from "ui/basic";
import Icon, { IconName } from "ui/Icon";
import Button from "ui/Button";

const getCategoryPathArray = (category : string ) : string[] => {
      return category.split('/')
}

interface ICategory {
  [key: string]: ICategory;
}

interface ICategoryHierarchySelector {
  maxLevel?: 1 | 2 | 3 | 4 | 5;
  categories: ICategory;
  activeCategory: string;
  onChange: (cat: string) => void;
}

const CategoryHierarchySelector: React.FC<ICategoryHierarchySelector> = ({ maxLevel = 4,onChange, categories, activeCategory }) => {
  const categoryPathArray = getCategoryPathArray(activeCategory);
  // const [categoryPathArray,setCategoryPathArray] = useState(getCategoryPathArray(activeCategory));

  const handleCategoryChange = (value: string) => {
    const formattedValue = value.toLowerCase();
    const parentCat = categoryPathArray.slice(0, -1).join('/');
    if(parentCat){
      const newActiveCategoey = `${parentCat}/${formattedValue}`;
      onChange(newActiveCategoey);
    }else {
      onChange(formattedValue);
    }
  };

  const handleNewAddSubCategory = () => {
    const parentCat = categoryPathArray.join('/');
    const newActiveCategoey = parentCat + '/';
    onChange(newActiveCategoey);
  };

  const handleDeleteSubCategory = () => {
    const parentCat = categoryPathArray.slice(0,-1).join('/');
    onChange(parentCat);
  };

  const renderCategoryInputs = () => {
    const leafCategoryIndex = categoryPathArray.length - 1;
    return categoryPathArray.map((category, index) => (
    <Col style={{position: 'relative'}} p='0 0 1rem' key={index}>
        <InputWithSuggestions
            suggestions={getCategorySuggestionsFromPath(index,categoryPathArray,categories)}
            disabled={index !== leafCategoryIndex}
            key={index}
            label={index === 0 ? "Category" : `Sub Category ${index}`}
            placeholder={`Enter ${index === 0 ? "Category" : `Sub-Category ${index}`}`}
            value={category}
            onChange={handleCategoryChange}
        />
        {(index === leafCategoryIndex) && 
          (
            <Row  w='initial' style={{position: 'absolute',bottom: '-0.5rem', right: '0rem',gap: '0.5rem'}} a="center">
              {
                (category && index < maxLevel - 1) &&
                  <Button type="button" size="small" padding="0" br="4px" onClick={ handleNewAddSubCategory} bg="#069e13">
                    <Icon name={IconName.Plus} clickEffectTime={0} height={0.7} width={0.75} borderRadius={0.25}/>
                  </Button>
              }
              {
              index !== 0 && 
              (
                <Button type="button" padding="0" br="4px" size="small" onClick={ handleDeleteSubCategory} bg='#dc0f20'>
                  <Icon name={IconName.Delete} clickEffectTime={0} height={0.65} width={0.65} borderRadius={0.25}/>
                </Button>
              )
              }
            </Row>
          )
        }  
    </Col>
    ));
  };
  const getCategorySuggestionsFromPath = (
    index: number,
    categoryPathArray: string[],
    categories: ICategory
  ) => {
    const parentCategory = categoryPathArray.slice(0, -1).reduce(
      (current, categoryKey) => current?.[categoryKey],
      categories
    );
    if (!parentCategory) return [];

    return Object.keys(parentCategory);
  };

  return (
    <Col>
      {renderCategoryInputs()}
    </Col>
  );
};

export default CategoryHierarchySelector;
