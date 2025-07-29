# web 端掌上重邮课表模拟

这是一个使用 React 和 Vite 构建的课表管理系统，用于模拟掌上重邮的课表功能。

## 项目简介

本项目旨在创建一个 web 端的课表管理应用，允许用户查看、添加和管理课程及作业安排。项目使用现代化的前端技术栈构建，具有快速开发和热重载功能。

## 技术栈

- **React** - 用于构建用户界面的 JavaScript 库
- **Vite** - 快速的前端构建工具
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Less** - CSS 预处理器
- **Axios** - 基于 Promise 的 HTTP 客户端

## 功能特性

- 获取课程/日程数据
- 支持网络请求课程数据
- 添加，编辑，删除日程
- 显示当前时间
- 支持回到本周按钮
- 课表出场动画
- 显示日程详细信息
- 支持整学期
- 支持关联一位同学
- 日程时间冲突提醒
- 响应式设计

## 开发工具配置

本项目使用了以下开发工具：

HMR (Hot Module Replacement) - 热模块替换，提升开发体验

ESLint - 代码规范检查

TypeScript - 静态类型检查

## 开发指南

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

构建项目：

```bash
npm run build
```

预览生产构建：

```bash
npm run preview
```

## API 接口

获取关联同学课程数据

```TypeScript
getWorkData({ id: number })
```
