import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Screen = 'home' | 'transfer' | 'add' | 'pay' | 'activity' | 'account';
type Stage = 'welcome' | 'signin' | 'app';
type IconName = React.ComponentProps<typeof Ionicons>['name'];

const palette = {
  ink: '#142D2A',
  green: '#146B5B',
  lime: '#D8F36A',
  paper: '#F4F6EF',
  white: '#FFFFFF',
  muted: '#7B8984',
  line: '#E5EAE3',
  coral: '#ED795D',
};

const transactions = [
  { name: 'Maya Chen', detail: 'Transfer · Today, 10:42 AM', amount: '-$48.00', icon: 'arrow-up-outline' as IconName, tint: '#E7F0E8' },
  { name: 'Northstar Market', detail: 'Card payment · Yesterday', amount: '-$32.65', icon: 'cart-outline' as IconName, tint: '#F8E9E2' },
  { name: 'Studio Payroll', detail: 'Income · Oct 10', amount: '+$2,450.00', icon: 'arrow-down-outline' as IconName, tint: '#EAF0CF' },
];

const navItems: { key: Screen; label: string; icon: IconName }[] = [
  { key: 'home', label: 'Home', icon: 'grid-outline' },
  { key: 'activity', label: 'Activity', icon: 'time-outline' },
  { key: 'account', label: 'Profile', icon: 'person-outline' },
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <View style={styles.brand}>
      <View style={styles.brandMark}><View style={styles.brandMarkInner} /></View>
      <Text style={[styles.brandName, light && { color: palette.white }]}>DARYXX</Text>
    </View>
  );
}

function PrimaryButton({ title, onPress, secondary = false }: { title: string; onPress: () => void; secondary?: boolean }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.primaryButton, secondary && styles.secondaryButton, pressed && styles.pressed]}>
      <Text style={[styles.primaryButtonText, secondary && styles.secondaryButtonText]}>{title}</Text>
      {!secondary && <Ionicons name="arrow-forward" size={18} color={palette.ink} />}
    </Pressable>
  );
}

function Heading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <View style={styles.headingWrap}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.heading}>{title}</Text>
      {subtitle ? <Text style={styles.subheading}>{subtitle}</Text> : null}
    </View>
  );
}

function TransactionRow({ item }: { item: (typeof transactions)[number] }) {
  const positive = item.amount.startsWith('+');
  return (
    <View style={styles.transactionRow}>
      <View style={[styles.transactionIcon, { backgroundColor: item.tint }]}>
        <Ionicons name={item.icon} size={19} color={palette.ink} />
      </View>
      <View style={styles.transactionCopy}>
        <Text style={styles.transactionName}>{item.name}</Text>
        <Text style={styles.transactionDetail}>{item.detail}</Text>
      </View>
      <Text style={[styles.transactionAmount, positive && styles.positiveAmount]}>{item.amount}</Text>
    </View>
  );
}

function App() {
  const [stage, setStage] = useState<Stage>('welcome');
  const [screen, setScreen] = useState<Screen>('home');
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [accountBalance, setAccountBalance] = useState(4286.5);
  const [notice, setNotice] = useState('');
  const [amount, setAmount] = useState('');

  const go = (next: Screen) => {
    setNotice('');
    setAmount('');
    setScreen(next);
  };

  const renderWelcome = () => (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.welcomeContent}>
        <Brand />
        <View style={styles.welcomeHero}>
          <Text style={styles.welcomeEyebrow}>YOUR MONEY, IN MOTION</Text>
          <Text style={styles.welcomeTitle}>A little more{ '\n' }in your control.</Text>
          <Text style={styles.welcomeCopy}>Everyday banking that feels clear, calm, and entirely yours.</Text>
        </View>
        <View style={styles.previewCard}>
          <View style={styles.previewTop}><Text style={styles.previewLabel}>DARYXX EVERYDAY</Text><Ionicons name="wifi" size={18} color={palette.lime} /></View>
          <Text style={styles.previewBalance}>$ 4,286.50</Text>
          <View style={styles.previewBottom}><Text style={styles.previewNumber}>••••  2048</Text><View style={styles.cardChip}><View /></View></View>
        </View>
        <View style={styles.welcomeFooter}>
          <View style={styles.pagination}><View style={styles.pageDotActive} /><View style={styles.pageDot} /><View style={styles.pageDot} /></View>
          <PrimaryButton title="Get started" onPress={() => setStage('signin')} />
          <Pressable onPress={() => setStage('signin')} style={styles.textButton}><Text style={styles.textButtonLabel}>I already have an account</Text></Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const renderSignIn = () => (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.formPage} keyboardShouldPersistTaps="handled">
        <Pressable onPress={() => setStage('welcome')} style={styles.backButton}><Ionicons name="arrow-back" size={20} color={palette.ink} /></Pressable>
        <Brand />
        <Heading eyebrow="WELCOME BACK" title="Good to see you." subtitle="Sign in to pick up right where you left off." />
        <Text style={styles.inputLabel}>Mobile number</Text>
        <View style={styles.inputWrap}><Ionicons name="call-outline" size={18} color={palette.muted} /><TextInput keyboardType="phone-pad" placeholder="Your phone number" placeholderTextColor="#9AA6A0" style={styles.textInput} /></View>
        <Text style={styles.inputLabel}>Passcode</Text>
        <View style={styles.inputWrap}><Ionicons name="lock-closed-outline" size={18} color={palette.muted} /><TextInput keyboardType="number-pad" secureTextEntry placeholder="Enter your passcode" placeholderTextColor="#9AA6A0" style={styles.textInput} /></View>
        <Pressable style={styles.forgotButton}><Text style={styles.forgotLabel}>Forgot passcode?</Text></Pressable>
        <PrimaryButton title="Sign in" onPress={() => { setStage('app'); setScreen('home'); }} />
        <Text style={styles.demoNote}>Prototype only. No real account or payment processing.</Text>
      </ScrollView>
    </SafeAreaView>
  );

  const renderHome = () => (
    <>
      <View style={styles.homeHeader}>
        <View><Text style={styles.greeting}>MONDAY, OCTOBER 12</Text><Text style={styles.hello}>Good morning, Alex</Text></View>
        <Pressable style={styles.headerAction} onPress={() => go('account')} accessibilityLabel="Open profile"><Ionicons name="person-outline" size={20} color={palette.ink} /></Pressable>
      </View>
      <View style={styles.balanceCard}>
        <View style={styles.balanceTop}><Text style={styles.balanceCaption}>TOTAL BALANCE</Text><Pressable onPress={() => setBalanceVisible(!balanceVisible)} accessibilityLabel="Toggle balance visibility"><Ionicons name={balanceVisible ? 'eye-outline' : 'eye-off-outline'} size={19} color="#D1E2D5" /></Pressable></View>
        <Text style={styles.balanceValue}>{balanceVisible ? `$${accountBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••••'}</Text>
        <View style={styles.balanceBottom}><View style={styles.accountTag}><View style={styles.statusDot} /><Text style={styles.accountTagText}>Everyday account</Text></View><Text style={styles.accountNumber}>•• 2048</Text></View>
      </View>
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Quick actions</Text><Text style={styles.sectionHint}>YOUR SHORTCUTS</Text></View>
      <View style={styles.actionsGrid}>
        <QuickAction label="Send" icon="arrow-up-outline" onPress={() => go('transfer')} />
        <QuickAction label="Add money" icon="add" onPress={() => go('add')} />
        <QuickAction label="Pay bills" icon="receipt-outline" onPress={() => go('pay')} />
        <QuickAction label="Cards" icon="card-outline" onPress={() => go('account')} />
      </View>
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Recent activity</Text><Pressable onPress={() => go('activity')}><Text style={styles.seeAll}>See all <Ionicons name="arrow-forward" size={12} color={palette.green} /></Text></Pressable></View>
      <View style={styles.activityList}>{transactions.slice(0, 3).map((item) => <TransactionRow key={item.name} item={item} />)}</View>
    </>
  );

  const renderTransfer = () => (
    <View style={styles.screenContent}>
      <Heading eyebrow="MOVE MONEY" title="Send money" subtitle="A quick transfer, without the runaround." />
      <Text style={styles.inputLabel}>Send to</Text>
      <View style={styles.inputWrap}><Ionicons name="search-outline" size={19} color={palette.muted} /><TextInput placeholder="Name, phone, or account" placeholderTextColor="#9AA6A0" style={styles.textInput} /></View>
      <Text style={styles.inputLabel}>Recent people</Text>
      <View style={styles.contactsRow}>{[['MC', 'Maya'], ['JR', 'Jordan'], ['SK', 'Sam']].map(([initials, name]) => <Pressable key={name} style={styles.contact} onPress={() => setNotice(`${name} selected`)}><View style={styles.contactAvatar}><Text style={styles.contactInitials}>{initials}</Text></View><Text style={styles.contactName}>{name}</Text></Pressable>)}</View>
      <Text style={styles.inputLabel}>Amount</Text>
      <View style={styles.amountWrap}><Text style={styles.currency}>$</Text><TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0.00" placeholderTextColor="#B3BDB7" style={styles.amountInput} /></View>
      <View style={styles.availableRow}><Text style={styles.availableLabel}>Available balance</Text><Text style={styles.availableValue}>${accountBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text></View>
      {notice ? <Text style={styles.notice}>{notice}</Text> : null}
      <PrimaryButton title="Review transfer" onPress={() => setNotice(amount ? `Transfer of $${amount} is ready for review.` : 'Enter an amount to continue.')} />
      <Text style={styles.demoNote}>Transfers are simulated in this prototype.</Text>
    </View>
  );

  const renderAddMoney = () => (
    <View style={styles.screenContent}>
      <Heading eyebrow="ADD TO YOUR BALANCE" title="Add money" subtitle="Top up your DARYXX account in a few taps." />
      <Text style={styles.inputLabel}>From</Text>
      <View style={styles.fundingSource}>
        <View style={styles.fundingIcon}><Ionicons name="card-outline" size={20} color={palette.green} /></View>
        <View style={styles.profileRowCopy}><Text style={styles.profileRowTitle}>Visa debit card</Text><Text style={styles.profileRowDetail}>••••  4821</Text></View>
        <Ionicons name="chevron-down" size={17} color={palette.muted} />
      </View>
      <Text style={styles.inputLabel}>Amount</Text>
      <View style={styles.amountWrap}><Text style={styles.currency}>$</Text><TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0.00" placeholderTextColor="#B3BDB7" style={styles.amountInput} /></View>
      <View style={styles.availableRow}><Text style={styles.availableLabel}>New balance</Text><Text style={styles.availableValue}>${(accountBalance + (Number(amount) || 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text></View>
      {notice ? <Text style={styles.notice}>{notice}</Text> : null}
      <PrimaryButton title="Add money" onPress={() => {
        const deposit = Number(amount);
        if (!Number.isFinite(deposit) || deposit <= 0) {
          setNotice('Enter an amount greater than zero.');
          return;
        }
        setAccountBalance((current) => current + deposit);
        setAmount('');
        setNotice(`$${deposit.toFixed(2)} added to your demo balance.`);
      }} />
      <Text style={styles.demoNote}>This is a simulated top-up. No card is charged.</Text>
    </View>
  );

  const renderPay = () => (
    <View style={styles.screenContent}>
      <Heading eyebrow="EVERYDAY PAYMENTS" title="Pay a bill" subtitle="Keep the little things moving." />
      <View style={styles.billGrid}>{[
        ['phone-portrait-outline', 'Mobile'], ['flash-outline', 'Electric'], ['wifi-outline', 'Internet'], ['tv-outline', 'Streaming'],
      ].map(([icon, label]) => <Pressable key={label} onPress={() => setNotice(`${label} selected`)} style={styles.billOption}><View style={styles.billIcon}><Ionicons name={icon as IconName} size={22} color={palette.green} /></View><Text style={styles.billLabel}>{label}</Text><Ionicons name="chevron-forward" size={16} color={palette.muted} /></Pressable>)}</View>
      <Text style={styles.inputLabel}>Account or phone number</Text>
      <View style={styles.inputWrap}><Ionicons name="person-outline" size={18} color={palette.muted} /><TextInput placeholder="Enter account details" placeholderTextColor="#9AA6A0" style={styles.textInput} /></View>
      <Text style={styles.inputLabel}>Amount</Text>
      <View style={styles.amountWrap}><Text style={styles.currency}>$</Text><TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0.00" placeholderTextColor="#B3BDB7" style={styles.amountInput} /></View>
      {notice ? <Text style={styles.notice}>{notice}</Text> : null}
      <PrimaryButton title="Continue to payment" onPress={() => setNotice(amount ? `Payment of $${amount} is ready for review.` : 'Choose a bill type and enter an amount.')} />
      <Text style={styles.demoNote}>Bill payments are simulated in this prototype.</Text>
    </View>
  );

  const renderActivity = () => (
    <View style={styles.screenContent}>
      <Heading eyebrow="YOUR MONEY, ACCOUNTED FOR" title="Activity" subtitle="Every move, all in one place." />
      <View style={styles.filterRow}><Pressable style={styles.filterActive}><Text style={styles.filterActiveText}>All</Text></Pressable><Pressable style={styles.filter}><Text style={styles.filterText}>Income</Text></Pressable><Pressable style={styles.filter}><Text style={styles.filterText}>Spending</Text></Pressable></View>
      <Text style={styles.dateGroup}>THIS WEEK</Text>
      <View style={styles.activityList}>{transactions.map((item) => <TransactionRow key={item.name} item={item} />)}</View>
      <View style={styles.monthSummary}><View><Text style={styles.summaryLabel}>OCTOBER SPENDING</Text><Text style={styles.summaryValue}>$612.38</Text></View><View style={styles.summaryIcon}><Ionicons name="trending-down-outline" size={19} color={palette.green} /></View></View>
    </View>
  );

  const renderAccount = () => (
    <View style={styles.screenContent}>
      <Heading eyebrow="YOUR DARYXX" title="Profile" subtitle="Your account, your way." />
      <View style={styles.profileBlock}><View style={styles.profileAvatar}><Text style={styles.profileInitials}>AC</Text></View><View><Text style={styles.profileName}>Alex Carter</Text><Text style={styles.profileDetail}>Member since 2024</Text></View><Pressable style={styles.editButton}><Ionicons name="create-outline" size={19} color={palette.green} /></Pressable></View>
      <View style={styles.profileList}>{[
        ['card-outline', 'Cards & accounts', '•••• 2048'], ['shield-checkmark-outline', 'Security', 'Passcode & biometrics'], ['notifications-outline', 'Notifications', 'Manage alerts'], ['help-circle-outline', 'Help & support', 'We’re here for you'],
      ].map(([icon, label, detail]) => <Pressable key={label} style={styles.profileRow}><View style={styles.profileRowIcon}><Ionicons name={icon as IconName} size={20} color={palette.green} /></View><View style={styles.profileRowCopy}><Text style={styles.profileRowTitle}>{label}</Text><Text style={styles.profileRowDetail}>{detail}</Text></View><Ionicons name="chevron-forward" size={16} color={palette.muted} /></Pressable>)}</View>
      <Pressable onPress={() => { setStage('signin'); setScreen('home'); }} style={styles.signOut}><Ionicons name="log-out-outline" size={18} color={palette.coral} /><Text style={styles.signOutText}>Sign out</Text></Pressable>
    </View>
  );

  if (stage === 'welcome') return renderWelcome();
  if (stage === 'signin') return renderSignIn();

  const page = screen === 'home' ? renderHome() : screen === 'transfer' ? renderTransfer() : screen === 'add' ? renderAddMoney() : screen === 'pay' ? renderPay() : screen === 'activity' ? renderActivity() : renderAccount();
  const activeTab: Screen = screen === 'activity' ? 'activity' : screen === 'account' ? 'account' : 'home';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.paper} />
      <ScrollView contentContainerStyle={screen === 'home' ? styles.homeContent : styles.innerPage} keyboardShouldPersistTaps="handled">
        {screen !== 'home' && <Pressable onPress={() => go('home')} style={styles.pageBack}><Ionicons name="arrow-back" size={19} color={palette.ink} /><Text style={styles.pageBackText}>Back</Text></Pressable>}
        {page}
      </ScrollView>
      <View style={styles.tabBar}>
        {navItems.map((item) => <Pressable key={item.key} onPress={() => go(item.key)} style={styles.tabItem}>
          <Ionicons name={item.icon} size={21} color={activeTab === item.key ? palette.green : palette.muted} />
          <Text style={[styles.tabLabel, activeTab === item.key && styles.tabLabelActive]}>{item.label}</Text>
        </Pressable>)}
        <Pressable onPress={() => go('transfer')} style={styles.tabItem}><View style={styles.tabSend}><Ionicons name="arrow-up" size={18} color={palette.ink} /></View><Text style={styles.tabLabel}>Send</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

function QuickAction({ label, icon, onPress }: { label: string; icon: IconName; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}><View style={styles.quickIcon}><Ionicons name={icon} size={21} color={palette.green} /></View><Text style={styles.quickLabel}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.paper },
  welcomeContent: { flexGrow: 1, paddingHorizontal: 25, paddingTop: 22, paddingBottom: 18 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandMark: { width: 27, height: 27, borderRadius: 8, backgroundColor: palette.green, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-8deg' }] },
  brandMarkInner: { width: 10, height: 10, borderRadius: 3, backgroundColor: palette.lime },
  brandName: { fontSize: 15, fontWeight: '900', color: palette.ink, letterSpacing: 1.4 },
  welcomeHero: { marginTop: 50, marginBottom: 28 },
  welcomeEyebrow: { fontSize: 10, fontWeight: '800', color: palette.green, letterSpacing: 1.8, marginBottom: 15 },
  welcomeTitle: { fontFamily: 'Georgia', fontSize: 39, lineHeight: 46, color: palette.ink },
  welcomeCopy: { marginTop: 13, maxWidth: 295, color: '#61716B', fontSize: 15, lineHeight: 23 },
  previewCard: { minHeight: 196, borderRadius: 10, backgroundColor: palette.ink, padding: 23, justifyContent: 'space-between', overflow: 'hidden' },
  previewTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  previewLabel: { color: '#BCD1C8', fontWeight: '700', fontSize: 10, letterSpacing: 1.5 },
  previewBalance: { color: palette.white, fontSize: 29, fontWeight: '700' },
  previewBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  previewNumber: { color: '#D9E3DD', letterSpacing: 1.2, fontSize: 12 },
  cardChip: { width: 33, height: 25, borderRadius: 5, backgroundColor: palette.lime, justifyContent: 'center', alignItems: 'center' },
  welcomeFooter: { marginTop: 'auto', paddingTop: 28 },
  pagination: { flexDirection: 'row', gap: 6, marginBottom: 17 },
  pageDotActive: { width: 20, height: 6, borderRadius: 3, backgroundColor: palette.green },
  pageDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#C7D1C9' },
  primaryButton: { minHeight: 54, paddingHorizontal: 18, borderRadius: 6, backgroundColor: palette.lime, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  primaryButtonText: { color: palette.ink, fontSize: 15, fontWeight: '800' },
  secondaryButton: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line },
  secondaryButtonText: { color: palette.ink },
  pressed: { opacity: 0.76 },
  textButton: { alignItems: 'center', paddingVertical: 17 },
  textButtonLabel: { color: palette.green, fontSize: 13, fontWeight: '700' },
  formPage: { flexGrow: 1, padding: 25, paddingTop: 16 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: palette.white, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  headingWrap: { marginTop: 34, marginBottom: 25 },
  eyebrow: { color: palette.green, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 9 },
  heading: { color: palette.ink, fontFamily: 'Georgia', fontSize: 31, lineHeight: 37 },
  subheading: { color: palette.muted, fontSize: 14, lineHeight: 21, marginTop: 7 },
  inputLabel: { color: palette.ink, fontSize: 12, fontWeight: '700', marginTop: 19, marginBottom: 9 },
  inputWrap: { minHeight: 53, flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 15, borderRadius: 6, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.white },
  textInput: { flex: 1, fontSize: 14, color: palette.ink, paddingVertical: 12 },
  forgotButton: { alignSelf: 'flex-end', paddingVertical: 16 },
  forgotLabel: { fontSize: 12, color: palette.green, fontWeight: '700' },
  demoNote: { textAlign: 'center', fontSize: 11, lineHeight: 16, color: palette.muted, marginTop: 15 },
  homeContent: { paddingHorizontal: 20, paddingTop: 13, paddingBottom: 25 },
  homeHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 19 },
  greeting: { fontSize: 9, fontWeight: '800', letterSpacing: 1.25, color: palette.muted },
  hello: { color: palette.ink, fontSize: 21, fontWeight: '700', marginTop: 5 },
  headerAction: { width: 43, height: 43, borderRadius: 22, backgroundColor: palette.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: palette.line },
  balanceCard: { minHeight: 183, backgroundColor: palette.green, borderRadius: 8, padding: 20, overflow: 'hidden', justifyContent: 'space-between' },
  balanceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceCaption: { color: '#C6DED2', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  balanceValue: { color: palette.white, fontSize: 34, fontWeight: '700', marginVertical: 9 },
  balanceBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  accountTag: { flexDirection: 'row', gap: 7, alignItems: 'center' },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: palette.lime },
  accountTagText: { color: '#D5E7DF', fontSize: 11 },
  accountNumber: { color: '#D5E7DF', fontSize: 11 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 25, marginBottom: 13 },
  sectionTitle: { color: palette.ink, fontSize: 16, fontWeight: '700' },
  sectionHint: { color: palette.muted, fontSize: 9, letterSpacing: 1.1, fontWeight: '700' },
  actionsGrid: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  quickAction: { flex: 1, alignItems: 'center', minWidth: 0 },
  quickIcon: { width: 54, height: 54, borderRadius: 7, backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, justifyContent: 'center', alignItems: 'center' },
  quickLabel: { color: palette.ink, fontSize: 10, fontWeight: '600', marginTop: 8, textAlign: 'center' },
  seeAll: { color: palette.green, fontSize: 12, fontWeight: '700' },
  activityList: { backgroundColor: palette.white, borderRadius: 7, paddingHorizontal: 13 },
  transactionRow: { minHeight: 70, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: palette.line, gap: 11 },
  transactionIcon: { width: 39, height: 39, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  transactionCopy: { flex: 1 },
  transactionName: { color: palette.ink, fontSize: 12, fontWeight: '700' },
  transactionDetail: { color: palette.muted, fontSize: 10, marginTop: 4 },
  transactionAmount: { color: palette.ink, fontSize: 12, fontWeight: '700' },
  positiveAmount: { color: palette.green },
  tabBar: { minHeight: 67, flexDirection: 'row', borderTopWidth: 1, borderTopColor: palette.line, backgroundColor: palette.white, paddingHorizontal: 12, justifyContent: 'space-around', alignItems: 'center' },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3, minHeight: 55 },
  tabLabel: { fontSize: 9, color: palette.muted, fontWeight: '600' },
  tabLabelActive: { color: palette.green, fontWeight: '800' },
  tabSend: { width: 27, height: 27, borderRadius: 8, backgroundColor: palette.lime, alignItems: 'center', justifyContent: 'center' },
  innerPage: { paddingHorizontal: 20, paddingTop: 11, paddingBottom: 27 },
  pageBack: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 7 },
  pageBackText: { color: palette.muted, fontSize: 12, fontWeight: '600' },
  screenContent: { paddingBottom: 24 },
  contactsRow: { flexDirection: 'row', gap: 22, marginTop: 4 },
  contact: { alignItems: 'center', gap: 7 },
  contactAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E4EEE6', alignItems: 'center', justifyContent: 'center' },
  contactInitials: { color: palette.green, fontSize: 12, fontWeight: '800' },
  contactName: { color: palette.ink, fontSize: 10, fontWeight: '600' },
  amountWrap: { flexDirection: 'row', alignItems: 'center', minHeight: 69, backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, borderRadius: 6, paddingHorizontal: 16 },
  currency: { fontSize: 23, color: palette.muted, fontWeight: '500', marginRight: 8 },
  amountInput: { flex: 1, fontSize: 28, fontWeight: '700', color: palette.ink, paddingVertical: 10 },
  availableRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 11, marginBottom: 24 },
  availableLabel: { color: palette.muted, fontSize: 11 },
  availableValue: { color: palette.ink, fontSize: 11, fontWeight: '700' },
  fundingSource: { minHeight: 62, flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 12, backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, borderRadius: 6 },
  fundingIcon: { width: 38, height: 38, borderRadius: 7, backgroundColor: '#EAF1E7', alignItems: 'center', justifyContent: 'center' },
  notice: { padding: 12, backgroundColor: '#E8F0D7', color: palette.green, borderRadius: 5, fontSize: 12, marginBottom: 13 },
  billGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 3 },
  billOption: { width: '48%', minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, borderRadius: 6, paddingHorizontal: 10, marginBottom: 9 },
  billIcon: { width: 35, height: 35, borderRadius: 6, backgroundColor: '#EAF1E7', alignItems: 'center', justifyContent: 'center' },
  billLabel: { flex: 1, color: palette.ink, fontSize: 11, fontWeight: '700' },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 23 },
  filterActive: { paddingHorizontal: 17, paddingVertical: 9, backgroundColor: palette.green, borderRadius: 4 },
  filterActiveText: { color: palette.white, fontSize: 11, fontWeight: '700' },
  filter: { paddingHorizontal: 17, paddingVertical: 9, backgroundColor: palette.white, borderRadius: 4 },
  filterText: { color: palette.muted, fontSize: 11, fontWeight: '600' },
  dateGroup: { color: palette.muted, fontSize: 9, fontWeight: '800', letterSpacing: 1.3, marginBottom: 10 },
  monthSummary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#E6EEDC', padding: 17, borderRadius: 7, marginTop: 20 },
  summaryLabel: { color: palette.green, fontWeight: '800', fontSize: 9, letterSpacing: 1.1 },
  summaryValue: { color: palette.ink, fontSize: 22, fontWeight: '700', marginTop: 5 },
  summaryIcon: { width: 39, height: 39, borderRadius: 20, backgroundColor: palette.white, alignItems: 'center', justifyContent: 'center' },
  profileBlock: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: palette.line },
  profileAvatar: { width: 55, height: 55, borderRadius: 28, backgroundColor: palette.lime, alignItems: 'center', justifyContent: 'center' },
  profileInitials: { color: palette.ink, fontSize: 15, fontWeight: '800' },
  profileName: { color: palette.ink, fontSize: 15, fontWeight: '700' },
  profileDetail: { color: palette.muted, fontSize: 11, marginTop: 4 },
  editButton: { marginLeft: 'auto', width: 36, height: 36, borderRadius: 18, backgroundColor: palette.white, alignItems: 'center', justifyContent: 'center' },
  profileList: { backgroundColor: palette.white, borderRadius: 7, paddingHorizontal: 13, marginTop: 18 },
  profileRow: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: 11, borderBottomWidth: 1, borderBottomColor: palette.line },
  profileRowIcon: { width: 37, height: 37, borderRadius: 7, backgroundColor: '#EAF1E7', alignItems: 'center', justifyContent: 'center' },
  profileRowCopy: { flex: 1 },
  profileRowTitle: { color: palette.ink, fontSize: 12, fontWeight: '700' },
  profileRowDetail: { color: palette.muted, fontSize: 10, marginTop: 4 },
  signOut: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 20 },
  signOutText: { color: palette.coral, fontSize: 12, fontWeight: '700' },
});

export default App;
