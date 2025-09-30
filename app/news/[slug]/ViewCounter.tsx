"use client";

import { useEffect, useState } from "react";

interface ViewCounterProps {
  postId: string;
}

export default function ViewCounter({ postId }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    if (!postId) return;

    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

    // 1. Увеличиваем просмотры
    fetch(`${wpUrl}/wp-json/post-views-counter/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: postId }),
    }).catch(console.error);

    // 2. Получаем текущее количество просмотров
    fetch(`${wpUrl}/wp-json/post-views-counter/views?id=${postId}`)
      .then((res) => res.json())
      .then((data) => {
        // В зависимости от структуры ответа плагина
        // обычно data.count или data.views
        setViews(data.count ?? data.views ?? 0);
      })
      .catch(() => setViews(0));
  }, [postId]);

  if (views === null) return null;

  return (
    <p className="text-sm text-gray-400 mb-2">
      👁 {views} Aufrufe
    </p>
  );
}
