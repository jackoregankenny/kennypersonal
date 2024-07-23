// src/lib/notion.ts
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getResources() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  
  if (!databaseId) {
    throw new Error('Notion Database ID is not set');
  }

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results.map((page: any) => {
    const properties = page.properties;
    return {
      id: page.id,
      title: properties.Name?.title[0]?.plain_text || 'Untitled',
      url: properties.URL?.url || '',
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      description: properties.Description?.rich_text[0]?.plain_text || '',
    };
  });
}

export async function getProjects() {
  const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID;
  
  if (!databaseId) {
    throw new Error('Notion Projects Database ID is not set');
  }

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results.map((page: any) => {
    const properties = page.properties;
    return {
      id: page.id,
      title: properties.Name?.title[0]?.plain_text || 'Untitled',
      url: properties.URL?.url || '',
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      description: properties.Description?.rich_text[0]?.plain_text || '',
    };
  });
}