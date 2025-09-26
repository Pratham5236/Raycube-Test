import { NextResponse } from 'next/server';
import { database } from '@/lib/database';

export async function GET() {
  try {
    const users = await database.getAllUsers();
    
    // Create CSV content
    const csvHeader = 'ID,Name,Email,Phone,Registered At\n';
    const csvRows = users.map(user => 
      `"${user.id}","${user.name}","${user.email}","${user.phone}","${user.registeredAt}"`
    ).join('\n');
    
    const csvContent = csvHeader + csvRows;
    
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="pizza-hut-registrations.csv"',
      },
    });
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
