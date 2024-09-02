import mongoose from 'mongoose';
import dotenv from 'dotenv';
import QuestionBank from '../models/QuestionBank';
import Question from '../models/Question';

dotenv.config();

const questionBanks = [
  {
    name: "常见编程概念",
    description: "测试你对基本编程概念的理解",
    questions: [
      { content: "什么是变量？", optionA: "存储数据的容器", optionB: "数学运算", order: 1 },
      { content: "什么是函数？", optionA: "数据类型", optionB: "可重用的代码块", order: 2 },
      { content: "什么是循环？", optionA: "重复执行代码的结构", optionB: "条件语句", order: 3 },
      { content: "什么是数组？", optionA: "单个数据项", optionB: "存储多个数据项的集合", order: 4 },
      { content: "什么是条件语句？", optionA: "循环结构", optionB: "基于条件执行代码的结构", order: 5 },
      { content: "什么是面向对象编程？", optionA: "使用对象进行编程的范式", optionB: "仅使用函数的编程方式", order: 6 },
      { content: "什么是API？", optionA: "应用程序接口", optionB: "编程语言", order: 7 },
      { content: "什么是调试？", optionA: "编写新代码", optionB: "查找和修复代码中的错误", order: 8 },
      { content: "什么是版本控制？", optionA: "管理代码变更的系统", optionB: "编译代码的工具", order: 9 },
      { content: "什么是算法？", optionA: "编程语言", optionB: "解决问题的步骤序列", order: 10 }
    ]
  },
  {
    name: "JavaScript基础",
    description: "测试你的JavaScript基础知识",
    questions: [
      { content: "JavaScript中如何声明变量？", optionA: "var, let, const", optionB: "variable, value", order: 1 },
      { content: "什么是闭包？", optionA: "一种循环", optionB: "能够访问自由变量的函数", order: 2 },
      { content: "什么是回调函数？", optionA: "主函数", optionB: "作为参数传递给另一个函数的函数", order: 3 },
      { content: "什么是Promise？", optionA: "异步操作的占位符", optionB: "同步操作", order: 4 },
      { content: "什么是箭头函数？", optionA: "ES6引入的简洁函数写法", optionB: "指向箭头的函数", order: 5 },
      { content: "什么是解构赋值？", optionA: "销毁变量", optionB: "从数组或对象中提取值的便捷方式", order: 6 },
      { content: "什么是模板字符串？", optionA: "使用反引号的字符串", optionB: "普通字符串", order: 7 },
      { content: "什么是事件冒泡？", optionA: "事件从最特定的元素开始触发，然后向上传播", optionB: "事件从最不特定的元素开始触发", order: 8 },
      { content: "什么是原型链？", optionA: "对象之间的继承关系", optionB: "函数调用链", order: 9 },
      { content: "什么是异步编程？", optionA: "同时执行多个操作", optionB: "按顺序执行操作", order: 10 }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/my_quiz_game');
    console.log('Connected to MongoDB');

    for (const bankData of questionBanks) {
      const bank = new QuestionBank({
        name: bankData.name,
        description: bankData.description
      });
      await bank.save();

      for (const questionData of bankData.questions) {
        const question = new Question({
          bankId: bank._id,
          content: questionData.content,
          optionA: questionData.optionA,
          optionB: questionData.optionB,
          order: questionData.order
        });
        await question.save();
      }

      console.log(`Added question bank: ${bank.name}`);
    }

    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();
