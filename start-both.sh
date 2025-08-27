#!/bin/bash

echo "🚀 Starting AutoBlog AI - Full Stack Application"
echo "================================================"

# Check if backend is already running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Backend already running on port 3000"
else
    echo "🔄 Starting backend API..."
    cd autoblog-ai
    npm run start:dev &
    BACKEND_PID=$!
    cd ..
    echo "✅ Backend started (PID: $BACKEND_PID)"
fi

sleep 3

# Check if frontend is already running
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Frontend already running on port 3001"
else
    echo "🔄 Starting frontend dashboard..."
    cd blog-ui
    npm start &
    FRONTEND_PID=$!
    cd ..
    echo "✅ Frontend started (PID: $FRONTEND_PID)"
fi

echo ""
echo "🎉 AutoBlog AI is now running!"
echo "📝 Backend API: http://localhost:3000"
echo "🌐 Frontend Dashboard: http://localhost:3001"
echo ""
echo "💡 Features available:"
echo "   • Smart topic selection with suggested software development problems"
echo "   • Keyword management and auto-suggestions"
echo "   • Technology Rivers link integration"
echo "   • AI-powered blog generation using GROQ/Llama"
echo "   • Professional formatting with HTML structure"
echo "   • DOCX and HTML download options"
echo "   • Direct email to marketing team"
echo ""
echo "🛑 Press Ctrl+C to stop both services"

# Wait for user interrupt
trap 'echo "Stopping services..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit' INT
wait
