// src/app/api/resources/route.ts
import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

export async function GET() {
  console.log('Database ID:', databaseId);

  if (!databaseId) {
    return NextResponse.json({ error: 'Notion Database ID is not set' }, { status: 500 });
  }

  try {
    console.log('Attempting to query Notion database...');
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    console.log('Notion API Response:', JSON.stringify(response, null, 2));

    const resources = response.results.map((page: any) => {
      const properties = page.properties;
      return {
        id: page.id,
        title: properties.Name?.title[0]?.plain_text || 'Untitled',
        url: properties.URL?.url || '',
        tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
        description: properties.Description?.rich_text[0]?.plain_text || '',
      };
    });

    console.log('Parsed resources:', JSON.stringify(resources, null, 2));

    return NextResponse.json(resources);
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch resources', 
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}