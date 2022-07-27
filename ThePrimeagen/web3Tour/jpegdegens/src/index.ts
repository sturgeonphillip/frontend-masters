import { ethers } from "ethers";
// deployed by hand to begin
import Counter from "../artifacts/contracts/Counter.sol/Counter.json";

function getEth() {
	// @ts-ignore
	const eth = window.ethereum;
	if (!eth) {
		throw new Error("get metamask and a positive attitude")
	}
	return eth;
}

async function hasAccounts() {
	const eth = getEth();
	const accounts = await eth.request({ method: "eth_accounts"}) as string[];

	return accounts && accounts.length;
}

async function requestAccounts() {
	const eth = getEth();
	const accounts = await eth.request({ method: "eth_requestAccounts"}) as string[];

	return accounts && accounts.length;
}

async function run() {
	if (!await hasAccounts() && !await requestAccounts()) {
		throw new Error("please let me take your money");
	}
	// addressOrName: string, contractInterface: Contract
	const counter = new ethers.Contract(
		process.env.CONTRACT_ADDRESS,
		Counter.abi,
		new ethers.providers.Web3Provider(getEth()).getSigner()
	)

	const el = document.createElement("div");
	async function setCounter(count?) {
		el.innerHTML = await count || counter.getCounter();
	}
	setCounter();
	
	const button = document.createElement("button");
	button.innerText = "increment";
	button.onclick = async function() {
		await counter.count();
	}
	counter.on(counter.filters.CounterInc(), function(count) {
		setCounter(count);
	})
	document.body.appendChild(el);
	document.body.appendChild(button);
}

run();
