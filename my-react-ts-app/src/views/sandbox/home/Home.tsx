import axios from 'axios';
import React, { useState } from 'react';

export default function Home() {
  const [deleteId, setDeleteId] = useState<string>(''); // 存储输入的 ID

  const handleJsonPut = async () => {
    try {
      const response = await axios({
        url: 'http://localhost:3000/posts',
        method: 'post',
        data: {
          title: 'json-server 测试',
          author: 'json-server'
        }
      });
      alert('✅ 新文章已添加！');
      console.log('POST 成功:', response.data);
    } catch (error) {
      alert('❌ 添加失败，请检查服务是否运行');
      console.error('POST 失败:', error);
    }
  };

  const handleJsonDelete = async () => {
    if (!deleteId || !/^\d+$/.test(deleteId)) {
      alert('⚠️ 请输入一个有效的数字 ID');
      return;
    }

    const id = Number(deleteId);

    try {
      await axios({
        url: `http://localhost:3000/posts/${id}`,
        method: 'delete'
      });
      alert(`✅ 成功删除 ID 为 ${id} 的资源`);
      setDeleteId('');
    } catch (error: any) {
      if (error.response?.status === 404) {
        alert(`❌ ID 为 ${id} 的资源不存在`);
      } else {
        alert('❌ 删除失败，请检查网络或 json-server 是否运行');
      }
      console.error('DELETE 失败:', error);
    }
  };

  const handleJsonModify = async (id: number) => {
    try {
      const response = await axios({
        url: `http://localhost:3000/posts/${id}`,
        method: 'patch',
        data: {
          title: 'json-server 测试1111',
          author: 'json-server'
        }
      });
      alert('✅ 修改成功');
      console.log('patch 成功:', response.data);
    } catch (error) {
      alert('❌ 修改失败，请检查服务是否运行');
      console.error('PATCH 失败:', error);
    }
  };
  const handlerightchildren = async () => {
    axios({
      url: 'http://localhost:3000/rights?_embed=children',
      method: 'get'
    }).then(res => {
      console.log(res.data);
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* 标题区域 */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">JSON Server 操作面板</h1>
          <p className="text-lg text-gray-600">通过简单界面测试 POST 与 DELETE 请求</p>
        </header>
        <div onClick={handlerightchildren}>
          测试
        </div>
        {/* 操作卡片 */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-transform hover:shadow-2xl">
          <div className="p-8 space-y-8">

            {/* 测试 POST 按钮 */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">创建新文章</h2>
              <button
                onClick={handleJsonPut}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium px-8 py-3 rounded-xl shadow-md transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300"
              >
                🚀 添加测试文章
              </button>
            </div>

            {/* 测试 PATCH 按钮 */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">修改指定文章</h2>
              <button
                onClick={() => handleJsonModify(1)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-8 py-3 rounded-xl shadow-md transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                ✏️ 修改 ID 为 1 的文章
              </button>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* 删除操作区域 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">删除指定文章</h2>
              <p className="text-center text-gray-500 mb-6">请输入要删除的文章 ID</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <input
                  type="text"
                  value={deleteId}
                  onChange={(e) => setDeleteId(e.target.value)}
                  placeholder="例如：1, 2, 3..."
                  className="px-5 py-3 w-full sm:w-64 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none transition duration-200 text-center text-lg shadow-sm"
                />
                <button
                  onClick={handleJsonDelete}
                  disabled={!deleteId}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium px-8 py-3 rounded-xl shadow-md transform transition hover:scale-105 disabled:hover:scale-100 focus:outline-none focus:ring-4 focus:ring-red-300 min-w-32"
                >
                  🗑️ 删除
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 底部提示 */}
        <footer className="text-center mt-8 text-gray-500 text-sm">
          💡 提示：确保 <code className="bg-gray-200 px-1 rounded">json-server</code> 正在运行（端口 3000）
        </footer>
      </div>
    </div>
  );
}