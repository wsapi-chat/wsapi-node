/**
 * Production Integration Test
 * Tests actual API calls against the WSApi production server
 */

import { HttpClient } from '../../src/ApiClient/HttpClient';
import { AccountClient } from '../../src/ApiClient/AccountClient';
import { SessionClient } from '../../src/ApiClient/SessionClient';
import { InstanceClient } from '../../src/ApiClient/InstanceClient';
import { ChatsClient } from '../../src/ApiClient/ChatsClient';
import { ContactsClient } from '../../src/ApiClient/ContactsClient';
import { GroupsClient } from '../../src/ApiClient/GroupsClient';
import { MessagesClient } from '../../src/ApiClient/MessagesClient';

// Load from environment variables
const API_KEY = process.env.WSAPI_API_KEY;
const INSTANCE_ID = process.env.WSAPI_INSTANCE_ID;
const TEST_RECIPIENT = process.env.WSAPI_TEST_RECIPIENT; // Optional: for message send test

if (!API_KEY || !INSTANCE_ID) {
  console.error('Error: WSAPI_API_KEY and WSAPI_INSTANCE_ID environment variables are required');
  console.error('Usage: WSAPI_API_KEY=your_key WSAPI_INSTANCE_ID=your_instance npx tsx tests/integration/prod-test.ts');
  process.exit(1);
}

async function runTests() {
  console.log('='.repeat(60));
  console.log('WSApi Production Integration Tests');
  console.log('='.repeat(60));
  console.log(`Instance: ${INSTANCE_ID}\n`);

  // Use HttpClient with WSApiClientOptions (uses X-API-Key header)
  const httpClient = new HttpClient({
    instanceId: INSTANCE_ID,
    apiKey: API_KEY,
  });

  // Create individual clients
  const session = new SessionClient(httpClient);
  const account = new AccountClient(httpClient);
  const instance = new InstanceClient(httpClient);
  const chats = new ChatsClient(httpClient);
  const contacts = new ContactsClient(httpClient);
  const groups = new GroupsClient(httpClient);
  const messages = new MessagesClient(httpClient);

  let passed = 0;
  let failed = 0;

  // Test 1: Session Status
  console.log('1. Testing Session Status...');
  try {
    const status = await session.tryGetSessionStatusAsync();
    if (status.isSuccess && status.result) {
      console.log('   ✓ Session status:', status.result);
      passed++;
    } else {
      console.log('   ✗ Failed:', status.error?.detail || 'Unknown error');
      failed++;
    }
  } catch (error) {
    console.log('   ✗ Error:', error);
    failed++;
  }

  // Test 2: Account Info
  console.log('\n2. Testing Account Info...');
  try {
    const accountInfo = await account.tryGetInfoAsync();
    if (accountInfo.isSuccess && accountInfo.result) {
      console.log('   ✓ Account info:', {
        id: accountInfo.result.id,
        name: accountInfo.result.name,
        pushName: accountInfo.result.pushName,
      });
      passed++;
    } else {
      console.log('   ✗ Failed:', accountInfo.error?.detail || 'Unknown error');
      failed++;
    }
  } catch (error) {
    console.log('   ✗ Error:', error);
    failed++;
  }

  // Test 3: Instance Settings
  console.log('\n3. Testing Instance Settings...');
  try {
    const settings = await instance.tryGetSettingsAsync();
    if (settings.isSuccess && settings.result) {
      console.log('   ✓ Instance settings:', settings.result);
      passed++;
    } else {
      console.log('   ✗ Failed:', settings.error?.detail || 'Unknown error');
      failed++;
    }
  } catch (error) {
    console.log('   ✗ Error:', error);
    failed++;
  }

  // Test 4: List Chats
  console.log('\n4. Testing List Chats...');
  try {
    const chatList = await chats.tryListAsync();
    if (chatList.isSuccess) {
      const chatData = chatList.result || [];
      console.log(`   ✓ Chats retrieved: ${chatData.length} chats`);
      if (chatData.length > 0) {
        console.log('   First chat:', {
          id: chatData[0].id,
          name: chatData[0].name,
        });
      }
      passed++;
    } else {
      console.log('   ✗ Failed:', chatList.error?.detail || 'Unknown error');
      failed++;
    }
  } catch (error) {
    console.log('   ✗ Error:', error);
    failed++;
  }

  // Test 5: List Contacts
  console.log('\n5. Testing List Contacts...');
  try {
    const contactList = await contacts.tryListAsync();
    if (contactList.isSuccess) {
      const contactData = contactList.result || [];
      console.log(`   ✓ Contacts retrieved: ${contactData.length} contacts`);
      if (contactData.length > 0) {
        console.log('   First contact:', {
          id: contactData[0].id,
          name: contactData[0].name,
        });
      }
      passed++;
    } else {
      console.log('   ✗ Failed:', contactList.error?.detail || 'Unknown error');
      failed++;
    }
  } catch (error) {
    console.log('   ✗ Error:', error);
    failed++;
  }

  // Test 6: List Groups
  console.log('\n6. Testing List Groups...');
  try {
    const groupList = await groups.tryListAsync();
    if (groupList.isSuccess) {
      const groupData = groupList.result || [];
      console.log(`   ✓ Groups retrieved: ${groupData.length} groups`);
      if (groupData.length > 0) {
        console.log('   First group:', {
          id: groupData[0].id,
          name: groupData[0].name,
        });
      }
      passed++;
    } else {
      console.log('   ✗ Failed:', groupList.error?.detail || 'Unknown error');
      failed++;
    }
  } catch (error) {
    console.log('   ✗ Error:', error);
    failed++;
  }

  // Test 7: Send Text Message (optional - requires TEST_RECIPIENT env var)
  console.log('\n7. Testing Send Text Message...');
  if (TEST_RECIPIENT) {
    try {
      const messageResult = await messages.trySendTextAsync({
        to: TEST_RECIPIENT,
        text: 'Test message from WSApi Node SDK',
      });
      if (messageResult.isSuccess && messageResult.result) {
        console.log('   ✓ Message sent:', {
          id: messageResult.result.id,
          timestamp: messageResult.result.timestamp,
        });
        passed++;
      } else {
        console.log('   ✗ Failed:', messageResult.error?.detail || 'Unknown error');
        failed++;
      }
    } catch (error) {
      console.log('   ✗ Error:', error);
      failed++;
    }
  } else {
    console.log('   ⊘ Skipped (set WSAPI_TEST_RECIPIENT to enable)');
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(60));

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(console.error);
