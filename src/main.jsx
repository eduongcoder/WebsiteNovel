import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './ConText/ThemeConText.jsx';
import { Provider } from 'react-redux';  // Thêm Provider từ react-redux
import store from './Redux/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>  {/* Bao bọc ứng dụng bằng Provider để cung cấp store */}
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>
);
