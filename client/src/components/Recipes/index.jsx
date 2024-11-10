import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const RecipeManagement = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/recipes');
            const data = await response.json();
            console.log('Fetched recipes:', data);
            setRecipes(data);
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recipe Management</h1>

           
            <div className={styles.recipeList}>
                {loading ? (
                    <p className={styles.loadingText}>Loading recipes...</p>
                ) : recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe._id} className={styles.recipeCard}>
                            <h3 className={styles.recipeName}>{recipe.name}</h3>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={recipe.image }
                                    //src="https://bakewithzoha.com/wp-content/uploads/2024/05/matilda-chocolate-cake-featured2.jpg"
                                    alt={recipe.name}
                                    className={styles.recipeImage}
                                />
                            </div>
                            <div className={styles.recipeDetails}>
                                <p><strong>Ingredients:</strong></p>
                                <ul>
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>

                                <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
};

export default RecipeManagement;
