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

- [ ] 获取课程/作业数据
- [ ] 添加新的课程/作业
- [ ] 编辑现有课程/作业
- [ ] 删除课程/作业
- [ ] 课表可视化展示
- [ ] 响应式设计

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

获取课程数据

```TypeScript
getWorkData({ id: number })
```

提交课程数据

```TypeScript
postWorkData(data: Partial<Work>)
```
