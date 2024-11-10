import React, { useState } from 'react';
import styles from './styles.module.css';

const AddRecipe = () => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState(null);
    const [tag, setTag] = useState('');
    const [loading, setLoading] = useState(false);

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // base64 string of the image
            };
            reader.readAsDataURL(file); // Converts image file to base64 string
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const recipeData = {
            name: recipeName,
            instructions,
            tag,
            image, // This is the base64 string of the image
            ingredients,
        };

        try {
            const response = await fetch('http://localhost:8090/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (response.ok) {
                alert('Recipe added successfully');
                // Reset form
                setRecipeName('');
                setIngredients(['']);
                setInstructions('');
                setImage(null);
                setTag('');
            } else {
                alert('Failed to add recipe');
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
            alert('Error adding recipe');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add New Recipe</h1>
            <form className={styles.recipeForm} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="recipeName">Recipe Name</label>
                    <input
                        type="text"
                        id="recipeName"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Ingredients</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className={styles.ingredientInput}>
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                required
                                placeholder={`Ingredient ${index + 1}`}
                            />
                            {ingredients.length > 1 && (
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() => handleRemoveIngredient(index)}
                                    aria-label={`Remove ingredient ${index + 1}`}
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddIngredient} className={styles.addButton}>
                        Add Ingredient
                    </button>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                        id="instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                        placeholder="Write the instructions here"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="image">Upload Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required={!image}
                    />
                    {image && (
                        <div className={styles.imagePreview}>
                            <img src={image} alt="Recipe" />
                        </div>
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="tag">Tag</label>
                    <select
                        id="tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        required
                    >
                        <option value="">Select a tag</option>
                        <option value="dessert">Dessert</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="main_course">Main Course</option>
                        <option value="snack">Snack</option>
                    </select>
                </div>

                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Adding...' : 'Submit Recipe'}
                </button>
            </form>
        </div>
    );
};

export default AddRecipe;
