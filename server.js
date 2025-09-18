const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const articlesDir = path.join(__dirname, 'app', 'public', 'articles');

// API: 모든 글 목록 가져오기
app.get('/api/articles', (req, res) => {
  const articles = {};
  try {
    const categories = fs.readdirSync(articlesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    categories.forEach(category => {
      const categoryPath = path.join(articlesDir, category);
      const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.md'));
      
      articles[category] = files.map(file => {
        const id = path.basename(file, '.md');
        const content = fs.readFileSync(path.join(categoryPath, file), 'utf8');
        const titleMatch = content.match(/^#\s+(.*)/);
        const title = titleMatch ? titleMatch[1] : id;
        return { id, title };
      });
    });

    res.json(articles);
  } catch (error) {
    console.error("Error reading articles:", error);
    res.status(500).json({ error: 'Failed to read articles' });
  }
});

// API: 새로운 글 저장하기
app.post('/api/articles', (req, res) => {
  try {
    const { category, title, content } = req.body;

    if (!category || !title || !content) {
      return res.status(400).json({ error: 'Category, title, and content are required.' });
    }

    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const categoryPath = path.join(articlesDir, category);
    const filePath = path.join(categoryPath, `${id}.md`);

    if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath, { recursive: true });
    }

    if (fs.existsSync(filePath)) {
      return res.status(409).json({ error: 'A file with this title already exists.' });
    }

    const fileContent = `# ${title}\n\n${content}`;

    fs.writeFileSync(filePath, fileContent, 'utf8');

    res.status(201).json({ success: true, message: 'Article created successfully', id });

  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// API: 단일 글 내용 가져오기
app.get('/api/articles/:category/:id', (req, res) => {
  try {
    const { category, id } = req.params;
    const filePath = path.join(articlesDir, category, `${id}.md`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const lines = fileContent.split('\n');
    const title = lines[0].replace(/^#\s+/, '');
    const content = lines.slice(2).join('\n');

    res.json({ title, content });

  } catch (error) {
    console.error(`Error fetching article ${req.params.category}/${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});


// API: 글 삭제하기


// API: 글 수정하기
app.put('/api/articles/:category/:id', (req, res) => {
  try {
    const { category, id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    const oldFilePath = path.join(articlesDir, category, `${id}.md`);

    if (!fs.existsSync(oldFilePath)) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const newId = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newFilePath = path.join(articlesDir, category, `${newId}.md`);
    const newFileContent = `# ${title}\n\n${content}`;

    // 제목(ID)이 변경되지 않은 경우
    if (id === newId) {
      fs.writeFileSync(oldFilePath, newFileContent, 'utf8');
    } else { // 제목(ID)이 변경된 경우
      // 새 파일 이름이 이미 존재하면 에러 처리
      if (fs.existsSync(newFilePath)) {
        return res.status(409).json({ error: 'A file with the new title already exists.' });
      }
      // 새 파일로 쓰고, 이전 파일은 삭제
      fs.writeFileSync(newFilePath, newFileContent, 'utf8');
      fs.unlinkSync(oldFilePath);
    }

    res.status(200).json({ success: true, message: 'Article updated successfully', id: newId });

  } catch (error) {
    console.error(`Error updating article ${req.params.category}/${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

app.delete('/api/articles/:category/:id', (req, res) => {

  try {
    const { category, id } = req.params;
    const filePath = path.join(articlesDir, category, `${id}.md`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Article not found' });
    }

    fs.unlinkSync(filePath);

    res.status(200).json({ success: true, message: 'Article deleted successfully' });

  } catch (error) {
    console.error(`Error deleting article ${req.params.category}/${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
