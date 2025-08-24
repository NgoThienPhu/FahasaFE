# CSS Architecture - Cấu trúc CSS mới

## 📁 Cấu trúc thư mục CSS

```
src/styles/
├── variables.css      # CSS Variables và Design Tokens
├── global.css         # Global styles và Reset CSS
├── components.css     # Component styles chung
├── Layout.css         # Layout styles cụ thể
└── README.md          # Tài liệu này
```

## 🔄 Thứ tự import CSS

1. **variables.css** - CSS Variables và Design Tokens (phải import đầu tiên)
2. **global.css** - Global styles và Reset CSS
3. **components.css** - Component styles chung
4. **Layout.css** - Layout styles cụ thể

## 🎨 CSS Variables (Design Tokens)

### Colors

```css
--color-primary: #e74c3c
--color-primary-dark: #c0392b
--color-gray-50: #f8f9fa
--color-gray-900: #000000
```

### Typography

```css
--font-family-primary: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
--font-size-base: 1rem
--font-weight-medium: 500
```

### Spacing

```css
--spacing-1: 0.25rem    /* 4px */
--spacing-4: 1rem       /* 16px */
--spacing-6: 1.5rem     /* 24px */
```

### Shadows

```css
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

## 🧩 Component Classes

### Buttons

```css
.btn .btn-primary .btn-secondary .btn-outline;
```

### Forms

```css
.input
```

### Cards

```css
.card .card-header .card-title .card-body;
```

### Badges

```css
.badge .badge-primary .badge-success .badge-warning .badge-error;
```

### Alerts

```css
.alert .alert-info .alert-success .alert-warning .alert-error;
```

## 📱 Responsive Design

Sử dụng CSS variables cho breakpoints:

```css
@media (max-width: var(--breakpoint-md)) {
  .container {
    padding: 0 var(--spacing-4);
  }
}
```

## 🚀 Cách sử dụng

### 1. Sử dụng CSS Variables

```css
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow);
}
```

### 2. Sử dụng Component Classes

```jsx
<button className="btn btn-primary">Click me</button>
<input className="input" placeholder="Enter text..." />
<div className="card">
    <div className="card-header">
        <h3 className="card-title">Card Title</h3>
    </div>
    <div className="card-body">Card content...</div>
</div>
```

### 3. Sử dụng Utility Classes

```jsx
<div className="d-flex justify-center align-center p-4">
  <span className="badge badge-primary">New</span>
</div>
```

## 📋 Quy tắc đặt tên

- **CSS Variables**: `--color-primary`, `--spacing-4`, `--font-size-lg`
- **Component Classes**: `.btn`, `.btn-primary`, `.card`, `.input`
- **Layout Classes**: `.layout`, `.header`, `.main`, `.container`

## ✅ Best Practices

1. **Luôn sử dụng CSS variables** thay vì hardcode values
2. **Component styles** nên được tái sử dụng
3. **Layout styles** chỉ áp dụng cho layout cụ thể
4. **Import CSS theo đúng thứ tự** để tránh conflicts
5. **Sử dụng semantic naming** cho classes

## 🔧 Maintenance

- Thêm CSS variables mới vào `variables.css`
- Thêm component styles mới vào `components.css`
- Thêm layout styles mới vào `Layout.css`
- Cập nhật `index.css` nếu thêm file mới
