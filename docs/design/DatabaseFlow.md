# Database Flow

This document describes the database flows used in the BLA2 Food Tracking App.

---

## 1. Save Food Flow

```mermaid
flowchart TD
    A[User fills Add Food form] --> B[Press Save]
    B --> C[handleAddFood food]
    C --> D[addFoodToDatabase food]
    D --> E[SQLite INSERT]
    E --> F[loadFoods]
    F --> G[getFoods]
    G --> H[setFoods]
    H --> I[Home]
```

---

## 2. Edit Food Flow

```mermaid
flowchart TD
    A[User selects Food] --> B[Edit Food]
    B --> C[Press Save]
    C --> D[onUpdateFood]
    D --> E[App.js updateFood]
    E --> F[updateFoodInDatabase]
    F --> G[SQLite UPDATE]
    G --> H[loadFoods]
    H --> I[Food Detail]
```

---

## 3. Delete Food Flow

```mermaid
flowchart TD
    A[User clicks Delete] --> B[deleteFood foodId]
    B --> C[deleteFoodFromDatabase foodId]
    C --> D[SQLite DELETE]
    D --> E[loadFoods]
    E --> F[getFoods]
    F --> G[setFoods]
    G --> H[Home]
```

---

## 4. Add Favorite Flow

```mermaid
flowchart TD
    A[User clicks ❤️] --> B[toggleFavorite item]
    B --> C[Calculate new favorite status]
    C --> D[updateFavorite foodId isFavorite]
    D --> E[SQLite UPDATE]
    E --> F[loadFoods]
    F --> G[setFoods]
    G --> H[setFavorites]
    H --> I[Favorite appears]
```

---

## 5. Remove Favorite Flow

```mermaid
flowchart TD
    A[User clicks 💔 Remove Favorite] --> B[removeFavorite id]
    B --> C[updateFavorite id 0]
    C --> D[SQLite UPDATE]
    D --> E[Set isFavorite = 0]
    E --> F[Update favorites state]
    F --> G[Favorites page]
    G --> H[Food is removed]
```

---

## 6. Database Initialization Flow

```mermaid
flowchart TD
    A[App starts] --> B[initDatabase]
    B --> C[Create foods table if not exists]
    C --> D[seedFoods]
    D --> E{Database empty?}
    E -->|Yes| F[Insert initial food data]
    E -->|No| G[Keep existing data]
    F --> H[loadFoods]
    G --> H[loadFoods]
    H --> I[getFoods]
    I --> J[setFoods]
    J --> K[Display Food]
```

---

## 7. Overall Database Architecture

```mermaid
flowchart TD
    A[React Native UI] --> B[App.js]
    B --> C[Database Functions]
    C --> D[SQLite]
    
    D --> E[foods table]
    
    E --> F[Food Data]
    E --> G[Favorite Status]
```

---

## CRUD Summary

```mermaid
flowchart LR
    A[Create] --> B[SQLite INSERT]
    C[Read] --> D[SQLite SELECT]
    E[Update] --> F[SQLite UPDATE]
    G[Delete] --> H[SQLite DELETE]
```

---

## Data Persistence

```mermaid
flowchart TD
    A[User adds or modifies data] --> B[SQLite Database]
    B --> C[App Reload]
    C --> D[getFoods]
    D --> E[Load saved data]
    E --> F[Display previous data]
```
