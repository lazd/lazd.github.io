{
  title: 'Gmail in Mail.app on Mac OS X Tiger',
  description: 'Get your e-mail on, PPC style',
  date: "2023-8-21",
  tags: [
      'vintage computing'
  ]
}

## Gmail setup

Before connecting, it's important to configure Gmail not only to allow IMAP access, but to restrict the number of items in each mailbox. If you're like me, you've got tens of thousands of messages in your Gmail account, and having access to every one of them on your old PPC Mac isn't really required.

See the Google article that details how to enable POP/IMAP on your Gmail account.

## Mail.app setup

Add a new account, select IMAP and enter the following settings:

Server: imap.gmail.com
Username: Your full e-mail address
Password: Your Gmail password

For STMP, enter the following:

Server: smtp.gmail.com
Username: Your full e-mail address
Password: Your Gmail password

The connection won't work, but continue anyway. Then, in Mail.app Preferences, select Accounts, and under Advanced, check Use SSL and ensure the port is set to 993. On the Account Information tab, click Server Settings near Outgoing Mail Server, change the port to 465 and check Use Secure Sockets Layer.

With that, your Mail.app is setup correctly, but it still won't work!

## Certificate woes

The first problem you'll see if you try to setup your Gmail account in Mail.app on Mac OS X Tiger is a certificate error. Google's certificate is signed by an authority that Tiger is unaware of. Even if you select "Continue," Mail.app still doesn't successfully connect to the IMAP server.

The fix is actually simple and involves downloading certificates from Google and adding them to the System keychain.

## Login woes

Now that you're connecting to the IMAP server, you'll find that the login fails. Re-typing your Gmail password won't help -- if you've got 2-factor authentication enabled, you'll need to setup an app password for Mail on your Google account.

## It works!

With IMAP enabled, the correct root certificates installed, an app password setup for Mail, and everything configured in Mail.app, you can now enjoy reading and writing e-mail on your old Mac!